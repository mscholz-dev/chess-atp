import React, { useEffect, useState } from "react";
import Page from "../templates/layouts/Page.js";
import Grid from "../templates/components/Grid.js";
import { io } from "socket.io-client";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { speechCondition } from "../utils/speech";
import GameProfile from "../templates/components/GameProfile";
import Section from "../templates/layouts/Section.js";
import ChessTemplate from "../templates/components/chess/ChessTemplate";
import GameApi from "./api/game";
import { restoreBoard, startGrid } from "../utils/grid.js";
import { resultWinner, resultLooser, resultEquality } from "../utils/result";
import { parseGameMoves } from "../utils/parsing.js";
import BtnSpeech from "../templates/components/BtnSpeech.js";
import WebcamClient from "../templates/components/WebcamClient.js";
import AuthApi from "./api/auth.js";
import useTranslation from "next-translate/useTranslation";

export default function Game({ locale }) {
  const { t } = useTranslation(["game", "common"]);

  const [toast, setToast] = useState({
    display: false,
    event: null,
    title: null,
    text: null,
  });

  const playerDataEmpty = {
    avatar: "",
    username: "",
  };

  const [auth, setAuth] = useState(false);
  const [language, setLanguage] = useState(null);

  const [playerOneData, setPlayerOneData] = useState(playerDataEmpty);
  const [playerTwoData, setPlayerTwoData] = useState(playerDataEmpty);

  const [turn, setTurn] = useState(null);
  const [prevTurn, setPrevTurn] = useState(false);

  const [playerOnePiece, setPlayerOnePiece] = useState([]);
  const [playerTwoPiece, setPlayerTwoPiece] = useState([]);

  const defaultTimer = 120;
  const [timerOne, setTimerOne] = useState(defaultTimer);
  const [timerTwo, setTimerTwo] = useState(defaultTimer);

  const [displayModal, setDisplayModal] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);

  const [socket, setSocket] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(null);

  const [gameMoves, setGameMoves] = useState([]);

  const [box, setBox] = useState([]);

  const [waitingTime, setWaitingTime] = useState(0);

  const emptyResult = {
    title: null,
    result: null,
  };

  const [result, setResult] = useState(emptyResult);

  const [currentNav, setCurrentNav] = useState(0);

  // TODO: webcam not done
  // const [displayWebcam, setDisplayWebcam] = useState(false);

  const [booleanModal, setBooleanModal] = useState(false);
  const [equalityTimeout, setEqualityTimeout] = useState(false);

  const handleToastClick = () => setToast({ ...toast, display: !toast.display });

  // init speech recognition
  const { transcript, listening } = useSpeechRecognition();

  // speech recognition event handler
  const handleClickSpeech = () => {
    // is playing
    if (!turn || waitingTime) return;

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  // search for the coordinate and click if found
  useEffect(() => speechCondition(transcript), [transcript]);

  // TODO: webcam not done
  // display camera
  // const handleClickWebcam = () => {
  //   // is playing
  //   if (!turn || waitingTime) return;

  //   setDisplayWebcam(!displayWebcam);
  // };

  const executeAudio = (audio) => new Audio(audio).play();
  const gameStartAudio = () => executeAudio("/sounds/game_start.mp3");
  const gameEqualityAudio = () => executeAudio("/sounds/stalemate.mp3");
  const gameCheckmateAudio = () => executeAudio("/sounds/checkmate.mp3");

  // search a game
  const handleNewGameClick = () => {
    // socket events
    if (!socket || turn || waitingTime) return;

    // to destroy all socket events created before
    socket.off("game:searching");
    socket.off("game:start");

    // search an enemy
    socket.emit("game:search");

    // waiting for an enemy
    socket.on("game:searching", () => {
      setDisplayLoader(true);
      setDisplayModal(false);
    });

    // start the game
    socket.on("game:start", async (arg) => {
      // reset game
      setCurrentNav(0);
      setGameMoves([]);
      setTimerOne(defaultTimer);
      setTimerTwo(defaultTimer);
      setBox(startGrid([]));
      setDisplayModal(false);
      setPlayerOnePiece([]);
      setPlayerTwoPiece([]);
      setResult(emptyResult);

      // init game
      setDisplayLoader(false);
      setTurn(1);
      setPlayerNumber(arg);

      const fetchApi = await GameApi.enemy();

      if (!fetchApi.state) {
        return setToast({
          display: true,
          event: "alert",
          title: t("common:toastTitleError"),
          text: t("game:toastTextErrorError"),
        });
      }

      setPlayerTwoData({
        avatar: `${process.env.BASE_URL_API}/uploads/${fetchApi.data.avatar}`,
        username: fetchApi.data.username,
      });

      gameStartAudio();
    });

    socket.on("game:canceled", () => setDisplayLoader(false));
  };

  // cancel searching event
  const handleCancelGameClick = () => waitingTime && socket.emit("game:cancelSearching");

  // send equality request to other player
  const handleEqualityClick = () => {
    console.log(equalityTimeout);
    if (!socket || !turn || waitingTime || equalityTimeout) return;

    socket.emit("game:requestEquality");

    setEqualityTimeout(true);

    // only equality request per minute
    setTimeout(() => setEqualityTimeout(false), 60000);

    setToast({
      display: true,
      event: "valid",
      title: t("game:toastTitleValidSent"),
      text: t("game:toastTextValidSent"),
    });
  };

  // surrender the game
  const handleSurrenderClick = () => {
    if (!socket || !turn || waitingTime) return;

    let data = playerNumber === 1 ? { looser: true, timerOne, timerTwo, surrender: true } : { winner: true, timerOne, timerTwo, surrender: true };
    socket.emit("game:finishing", data);

    setResult(resultLooser(t));
    setDisplayModal(true);
    setTurn(null);
    gameCheckmateAudio();
  };

  // for restart game timers after enemy deconnection
  useEffect(() => {
    if (prevTurn && turn === 1) setTimeout(() => setTimerOne(timerOne - 1), 2000);
    if (prevTurn && turn === 2) setTimeout(() => setTimerTwo(timerTwo - 1), 2000);
    setPrevTurn(false);
  }, [prevTurn, turn, timerOne, timerTwo]);

  useEffect(() => {
    if (displayLoader && !waitingTime && playerOneData.avatar && playerOneData.username && playerTwoData.avatar && playerTwoData.username && timerOne && timerTwo) {
      socket.emit("game:update", { timerOne, timerTwo });
    }
  }, [waitingTime, displayLoader]);

  // manage waiting time at game:start and game:wait
  useEffect(() => {
    if (!displayLoader) return setTimeout(() => setWaitingTime(0), 500);

    setTimeout(() => setWaitingTime(waitingTime + 1), 1000);

    // if waiting time is finished
    if (waitingTime === 30 && playerOneData.avatar && playerOneData.username && playerTwoData.avatar && playerTwoData.username) {
      let data = playerNumber === 1 ? { winner: true, timerOne, timerTwo } : { looser: true, timerOne, timerTwo };
      socket.emit("game:finishing", data);
      setDisplayLoader(false);
      setTurn(null);
      setResult(resultWinner(t));
      setDisplayModal(true);
      gameCheckmateAudio();
    }
  }, [waitingTime, displayLoader]);

  // create current player socket
  useEffect(async () => {
    if (!socket)
      setSocket(
        io(process.env.BASE_URL_API, {
          withCredentials: true,
          transports: ["websocket"],
          upgrade: false,
        })
      );

    // display current player data
    const res = await GameApi.index();

    // no connected
    if (!res.state) {
      return setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("game:toastTextErrorConnection"),
      });
    }

    setPlayerOneData({
      avatar: `${process.env.BASE_URL_API}/uploads/${res.data.avatar}`,
      username: res.data.username,
    });
  }, []);

  // try to reconnect player
  useEffect(() => {
    if (socket) {
      socket.emit("game:reconnecting");

      // to destroy all socket events created before
      socket.off("game:error");
      socket.off("game:reconnection");
      socket.off("game:reconnected");
      socket.off("game:wait");
      socket.off("game:reconnect");
      socket.off("game:surrender");
      socket.off("game:recieveEquality");
      socket.off("game:agreement");

      // if error in socket server
      socket.on("game:error", () => console.error("game:error"));

      // if enemy is in reconnection
      socket.on("game:reconnection", () => setDisplayLoader(false));

      socket.on("game:reconnected", () => {
        setToast({
          display: true,
          event: "valid",
          title: t("game:toastTitleValidParty"),
          text: t("game:toastTextValidParty"),
        });
        setPrevTurn(true);
      });

      // if enemy disconnect
      socket.on("game:wait", () => {
        setDisplayLoader(true);
        setToast({
          display: true,
          event: "alert",
          title: t("game:toastTitleErrorDeconnection"),
          text: t("game:toastTextErrorDeconnection"),
        });
      });

      // socket in reconnection
      socket.on("game:reconnect", ({ number, enemy, moves, turn, timerPlayerOne, timerPlayerTwo }) => {
        setDisplayLoader(false);

        setPlayerNumber(number);

        const { newBox, pieceEatOne, pieceEatTwo } = restoreBoard(box, moves);

        setBox(newBox);
        setPlayerOnePiece(pieceEatTwo);
        setPlayerTwoPiece(pieceEatOne);

        setPlayerTwoData({
          avatar: `${process.env.BASE_URL_API}/uploads/${enemy[0].avatar}`,
          username: enemy[0].username,
        });
        setGameMoves(parseGameMoves(moves));
        setToast({
          display: true,
          event: "valid",
          title: t("game:toastTitleValidReconnection"),
          text: t("game:toastTextValidReconnection"),
        });

        setTimerOne(timerPlayerOne);
        setTimerTwo(timerPlayerTwo);
        setTurn(turn);
      });

      socket.on("game:surrender", () => {
        setDisplayModal(true);
        setTurn(null);
        setResult(resultWinner(t));
        gameCheckmateAudio();
      });

      socket.on("game:recieveEquality", () => {
        setDisplayModal(true);
        setBooleanModal(true);
      });

      socket.on("game:agreement", () => {
        setDisplayModal(true);
        setTurn(null);
        setResult(resultEquality(t));
        gameEqualityAudio();
      });
    }
  }, [socket]);

  useEffect(async () => {
    // get auth
    const res = await AuthApi.index();
    if (!res.state) return;

    setAuth(res.role);
    setLanguage(res.language);
  }, []);

  return (
    <Page title={t("game:metaTitle")} auth={auth} toast={toast} handleToastClick={handleToastClick} locale={locale} language={language}>
      {/*TODO: webcam not done*/}
      {/* <WebcamClient displayWebcam={displayWebcam} setDisplayWebcam={setDisplayWebcam} handleClickWebcam={handleClickWebcam} /> */}
      <BtnSpeech handleClickSpeech={handleClickSpeech} listening={listening} />
      <div className="section-chess-main">
        <Section chess>
          <GameProfile imgSrc={playerTwoData.avatar || "../logo/chess-atp-icon.svg"} imgAlt={`${t("game:altAvatarStart")} ${playerTwoData.username || t("game:avatarNoData")}`} name={playerTwoData.username || t("game:avatarNoData")} time={playerNumber ? (playerNumber !== 1 ? timerOne : timerTwo) : 120} current={turn && turn !== playerNumber} pieces={playerNumber ? (playerNumber !== 1 ? playerTwoPiece : playerOnePiece) : []} />
          <Grid box={box} setBox={setBox} turn={turn} setTurn={setTurn} playerOnePiece={playerOnePiece} setPlayerOnePiece={setPlayerOnePiece} playerTwoPiece={playerTwoPiece} setPlayerTwoPiece={setPlayerTwoPiece} timerOne={timerOne} setTimerOne={setTimerOne} timerTwo={timerTwo} setTimerTwo={setTimerTwo} displayModal={displayModal} setDisplayModal={setDisplayModal} displayLoader={displayLoader} socket={socket} playerNumber={playerNumber} playerOneData={playerOneData} playerTwoData={playerTwoData} setToast={setToast} gameMoves={gameMoves} setGameMoves={setGameMoves} waitingTime={waitingTime} result={result} setResult={setResult} booleanModal={booleanModal} setBooleanModal={setBooleanModal} />
          <GameProfile imgSrc={playerOneData.avatar || "../logo/chess-atp-icon.svg"} imgAlt={`${t("game:altAvatarStart")} ${playerOneData.username || t("game:avatarCurrentNoData")}`} name={playerOneData.username || t("game:avatarCurrentNoData")} time={playerNumber ? (playerNumber === 1 ? timerOne : timerTwo) : 120} current={turn && turn === playerNumber} pieces={playerNumber ? (playerNumber === 1 ? playerTwoPiece : playerOnePiece) : []} />
        </Section>
        <Section chess>
          <ChessTemplate handleNewGameClick={handleNewGameClick} gameMoves={gameMoves} currentNav={currentNav} setCurrentNav={setCurrentNav} handleCancelGameClick={handleCancelGameClick} playerOneData={playerOneData} setToast={setToast} handleEqualityClick={handleEqualityClick} handleSurrenderClick={handleSurrenderClick} />
        </Section>
      </div>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
  return { props: { locale } };
}
