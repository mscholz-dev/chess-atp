import React, { useEffect, useState } from "react";
import Box from "./Box";
import { resetGridMove, isKingCheck, setBishopMove, setKingMove, setKnightMove, setPawnMoveOne, setPawnMoveTwo, setRookMove, startGrid, castlingLeftOne, castlingRightOne, executeCastlingLeftOne, executeCastlingRightOne, castlingLeftTwo, castlingRightTwo, executeCastlingLeftTwo, executeCastlingRightTwo, resetAfterCastling, setMenace, revertTurn, checkMovement, isKingStuck, isDefensible, socketMove, socketCastle, idToCoordinate, pawnIntoQueen } from "../../utils/grid";
import Modal from "./Modal";
import Loader from "./Loader";
import { resultWinner, resultLooser, resultEquality } from "../../utils/result";
import useTranslation from "next-translate/useTranslation";

export default function Grid({ box, setBox, turn, setTurn, playerOnePiece, setPlayerOnePiece, playerTwoPiece, setPlayerTwoPiece, timerOne, setTimerOne, timerTwo, setTimerTwo, displayModal, setDisplayModal, displayLoader, socket, playerNumber, playerOneData, playerTwoData, gameMoves, setGameMoves, waitingTime, result, setResult, booleanModal, setBooleanModal }) {
  const { t } = useTranslation("game");

  const [moveKingOne, setMoveKingOne] = useState(false);
  const [moveRookLeftOne, setMoveRookLeftOne] = useState(false);
  const [moveRookRightOne, setMoveRookRightOne] = useState(false);

  const [moveKingTwo, setMoveKingTwo] = useState(false);
  const [moveRookLeftTwo, setMoveRookLeftTwo] = useState(false);
  const [moveRookRightTwo, setMoveRookRightTwo] = useState(false);

  const [decrementTimer, setDecrementTimer] = useState(false);

  const emptyMovingData = {
    focusPiece: null,
    i: null,
    id: null,
    eatenPiece: null,
  };

  const [movingData, setMovingData] = useState(emptyMovingData);

  const executeAudio = (audio) => new Audio(audio).play();

  const castlingAudio = () => executeAudio("/sounds/castling.mp3");
  const checkAudio = () => executeAudio("/sounds/check.mp3");
  const checkmateAudio = () => executeAudio("/sounds/checkmate.mp3");
  const eatAudio = () => executeAudio("/sounds/eat.mp3");
  const gameOverAudio = () => executeAudio("/sounds/game_over.mp3");
  const moveAudio = () => executeAudio("/sounds/move.mp3");
  const stalemateAudio = () => executeAudio("/sounds/stalemate.mp3");

  const handleBoxClick = (id) => {
    // is playing
    if (!turn || waitingTime) return;

    // need a socket to play
    if (!socket) return;
    if (playerNumber !== turn) return;

    // player one castling
    if (box[id].castling && box[id].player === 1) {
      if (box[id].piece === "king" && box[56].focus) {
        socket.emit("game:castling", { king: 58, rook: 59, turn, timeLeft: timerOne });
        executeCastlingLeftOne(box);
        setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { bigCastle: true } }]);
      } else if (box[id].piece === "king" && box[63].focus) {
        socket.emit("game:castling", { king: 62, rook: 61, turn, timeLeft: timerOne });
        executeCastlingRightOne(box);
        setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { littleCastle: true } }]);
      } else if (box[id].piece === "rook" && id === 56) {
        socket.emit("game:castling", { king: 58, rook: 59, turn, timeLeft: timerOne });
        executeCastlingLeftOne(box);
        setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { bigCastle: true } }]);
      } else if (box[id].piece === "rook" && id === 63) {
        socket.emit("game:castling", { king: 62, rook: 61, turn, timeLeft: timerOne });
        executeCastlingRightOne(box);
        setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { littleCastle: true } }]);
      }

      castlingAudio();
      resetAfterCastling(box);
      setMenace(box);
      setTurn(2);

      // player two castling
    } else if (box[id].castling && box[id].player === 2) {
      if (box[id].piece === "king" && box[0].focus) {
        socket.emit("game:castling", { king: 2, rook: 3, turn, timeLeft: timerTwo });
        executeCastlingLeftTwo(box);
        gameMoves[gameMoves.length - 1]["playTwo"] = { bigCastle: true };
      } else if (box[id].piece === "king" && box[7].focus) {
        socket.emit("game:castling", { king: 6, rook: 5, turn, timeLeft: timerTwo });
        executeCastlingRightTwo(box);
        gameMoves[gameMoves.length - 1]["playTwo"] = { littleCastle: true };
      } else if (box[id].piece === "rook" && id === 0) {
        socket.emit("game:castling", { king: 2, rook: 3, turn, timeLeft: timerTwo });
        executeCastlingLeftTwo(box);
        gameMoves[gameMoves.length - 1]["playTwo"] = { bigCastle: true };
      } else if (box[id].piece === "rook" && id === 7) {
        socket.emit("game:castling", { king: 6, rook: 5, turn, timeLeft: timerTwo });
        executeCastlingRightTwo(box);
        gameMoves[gameMoves.length - 1]["playTwo"] = { littleCastle: true };
      }

      castlingAudio();
      resetAfterCastling(box);
      setMenace(box);
      setTurn(1);

      // player one set move
    } else if (box[id].player === 1 && turn === 1) {
      resetGridMove(box);
      box[id].focus = true;

      // set pawn move
      if (box[id].piece === "pawn") {
        setPawnMoveOne(box, id);

        // set rook move
      } else if (box[id].piece === "rook") {
        setRookMove(box, id, 1, 2);

        if (!moveKingOne && !moveRookLeftOne) {
          castlingLeftOne(box);
        }

        if (!moveKingOne && !moveRookRightOne) {
          castlingRightOne(box);
        }

        // set knight move
      } else if (box[id].piece === "knight") {
        setKnightMove(box, id, 2);

        // set bishop move
      } else if (box[id].piece === "bishop") {
        setBishopMove(box, id, 1, 2);

        // set queen move
      } else if (box[id].piece === "queen") {
        setRookMove(box, id, 1, 2);
        setBishopMove(box, id, 1, 2);

        // set king move
      } else if (box[id].piece === "king") {
        setKingMove(box, id, 2, "menaceTwo");

        if (!moveKingOne && !moveRookLeftOne) {
          castlingLeftOne(box);
        }

        if (!moveKingOne && !moveRookRightOne) {
          castlingRightOne(box);
        }
      }

      // player two set move
    } else if (box[id].player === 2 && turn === 2) {
      resetGridMove(box);
      box[id].focus = true;

      // set pawn move
      if (box[id].piece === "pawn") {
        setPawnMoveTwo(box, id);

        // set rook move
      } else if (box[id].piece === "rook") {
        setRookMove(box, id, 2, 1);

        if (!moveKingTwo && !moveRookLeftTwo) {
          castlingLeftTwo(box);
        }

        if (!moveKingTwo && !moveRookRightTwo) {
          castlingRightTwo(box);
        }

        // set knight move
      } else if (box[id].piece === "knight") {
        setKnightMove(box, id, 1);

        // set bishop move
      } else if (box[id].piece === "bishop") {
        setBishopMove(box, id, 2, 1);

        // set queen move
      } else if (box[id].piece === "queen") {
        setRookMove(box, id, 2, 1);
        setBishopMove(box, id, 2, 1);

        // set king move
      } else if (box[id].piece === "king") {
        setKingMove(box, id, 1, "menaceOne");

        if (!moveKingTwo && !moveRookLeftTwo) {
          castlingLeftTwo(box);
        }

        if (!moveKingTwo && !moveRookRightTwo) {
          castlingRightTwo(box);
        }
      }

      // choice and eat move
    } else if (box[id].choice || box[id].eat) {
      let kingOneCheck = false;
      let kingTwoCheck = false;
      let eatenPiece;

      for (let i = 0; i < 64; i++) {
        if (box[i].focus) {
          let movePiece;
          const movePlayer = box[id].player;
          const focusPiece = box[i].piece;
          eatenPiece = box[id].piece;

          if ((box[i].piece === "pawn" && turn === 1 && id >= 0 && id <= 7) || (box[i].piece === "pawn" && turn === 2 && id >= 56 && id <= 63)) {
            movePiece = "pawn";
            box[id].piece = "queen";
          } else {
            movePiece = box[id].piece;
            box[id].piece = box[i].piece;
          }

          box[id].player = turn;
          box[i].piece = null;
          box[i].player = null;
          box[i].focus = false;

          // check the king of the player one
          if (turn === 1 && isKingCheck(box, 1, "menaceTwo")) {
            revertTurn(box, id, i, movePiece, movePlayer, focusPiece, turn);
            kingOneCheck = true;
          }

          // check the king of the player two
          if (turn === 2 && isKingCheck(box, 2, "menaceOne")) {
            revertTurn(box, id, i, movePiece, movePlayer, focusPiece, turn);
            kingTwoCheck = true;
          }

          if (i === 0) {
            setMoveRookLeftTwo(true);
          } else if (i === 4) {
            setMoveKingTwo(true);
          } else if (i === 7) {
            setMoveRookRightTwo(true);
          } else if (i === 56) {
            setMoveRookLeftOne(true);
          } else if (i === 60) {
            setMoveKingOne(true);
          } else if (i === 63) {
            setMoveRookRightOne(true);
          }

          setMovingData({ focusPiece, i, id, eatenPiece });
        }
      }

      if (turn === 1 && !kingOneCheck) {
        if (box[id].eat) setPlayerTwoPiece([...playerTwoPiece, eatenPiece]);
        setTurn(2);
      } else if (turn === 2 && !kingTwoCheck) {
        if (box[id].eat) setPlayerOnePiece([...playerOnePiece, eatenPiece]);
        setTurn(1);
      }

      if (box[id].choice) moveAudio();
      if (box[id].eat) eatAudio();

      // reset the grid
      for (let i = 0; i < 64; i++) {
        box[i].choice = false;
        box[i].eat = false;
        box[i].castling = false;

        if (box[i].player === null && box[i].piece !== null) box[i].piece = null;
      }

      setMenace(box);

      // cancel the focus
      for (let i = 0; i < 64; i++) {
        box[i].focus = false;
        box[i].choice = false;
        box[i].eat = false;
        box[i].castling = false;
      }
    }

    setBox([...box]);
  };

  // set the timer for the player one
  useEffect(() => {
    if (displayLoader) return;

    if (turn === 1 && timerOne !== 0) setTimeout(() => setTimerOne(timerOne - 1), 1000);

    if (turn === 1 && timerOne === 0) {
      if (turn !== playerNumber) {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { winner: true, timerOne, timerTwo });
        setResult(resultWinner(t));
      } else {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { looser: true, timerOne, timerTwo });
        setResult(resultLooser(t));
      }

      setDisplayModal(true);
      setTurn(null);
      gameOverAudio();
    }
  }, [timerOne]);

  // set the timer for the player two
  useEffect(() => {
    if (displayLoader) return;

    if (turn === 2 && timerTwo !== 0) setTimeout(() => setTimerTwo(timerTwo - 1), 1000);

    if (turn === 2 && timerTwo === 0) {
      if (turn !== playerNumber) {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { winner: true, timerOne, timerTwo });
        setResult(resultWinner(t));
      } else {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { looser: true, timerOne, timerTwo });
        setResult(resultLooser(t));
      }

      setDisplayModal(true);
      setTurn(null);
      gameOverAudio();
    }
  }, [timerTwo]);

  useEffect(() => {
    // create the chessboard
    setBox(startGrid([]));
  }, []);

  // to destroy all socket events created before
  const destroySocketEvents = () => {
    socket.off("game:move");
    socket.off("game:eat");
    socket.off("game:castle");
  };

  const addEventsValues = (playerNumberClause) => {
    let checkValue, checkmateValue, stalemateValue;

    if (playerNumber === playerNumberClause || playerNumber === null) {
      checkValue = isKingCheck(box, 2, "menaceOne") && (isDefensible(box, 2, 1, "menaceOne") || !isKingStuck(box, 2, 1, "menaceOne"));
      checkmateValue = isKingCheck(box, 2, "menaceOne") && !isDefensible(box, 2, 1, "menaceOne") && isKingStuck(box, 2, 1, "menaceOne");
      stalemateValue = !checkMovement(box, 2) && !isKingCheck(box, 2, "menaceOne") && isKingStuck(box, 2, 1, "menaceOne");
    } else {
      checkValue = isKingCheck(box, 1, "menaceTwo") && (isDefensible(box, 1, 2, "menaceTwo") || !isKingStuck(box, 1, 2, "menaceTwo"));
      checkmateValue = isKingCheck(box, 1, "menaceTwo") && !isDefensible(box, 1, 2, "menaceTwo") && isKingStuck(box, 1, 2, "menaceTwo");
      stalemateValue = !checkMovement(box, 1) && !isKingCheck(box, 1, "menaceTwo") && isKingStuck(box, 1, 2, "menaceTwo");
    }

    return { checkValue, checkmateValue, stalemateValue };
  };

  // add data to gameMoves
  const updateGameMoves = (piece, move, eat, check, checkmate, stalemate) => {
    return {
      piece,
      move: idToCoordinate(move),
      eat: !!eat,
      check,
      checkmate,
      stalemate,
    };
  };

  // equality accepted
  const handleEqualityAccepted = () => {
    socket.emit("game:finishing", { equality: true, timerOne, timerTwo, agreement: true });
    setBooleanModal(false);
    setResult(resultEquality(t));
    setTurn(null);
    stalemateAudio();
  };

  // equality refused
  const handleEqualityRefused = () => {
    setDisplayModal(false);
    setBooleanModal(false);
  };

  // other useEffect not async because needed updated state
  useEffect(() => {
    if (socket && turn) {
      // destroy all events created before
      destroySocketEvents();

      // socket move event
      socket.on("game:move", ({ piece, prevPos, newPos }) => {
        socketMove(box, playerNumber, piece, prevPos, newPos);

        // if transform pawn into queen
        if (pawnIntoQueen(piece, playerNumber, newPos)) piece = "queen";

        const { checkValue, checkmateValue, stalemateValue } = addEventsValues(2);

        if (playerNumber !== 1) {
          setGameMoves([
            ...gameMoves,
            {
              id: gameMoves.length,
              playOne: updateGameMoves(piece, newPos, false, checkValue, checkmateValue, stalemateValue),
            },
          ]);
        } else {
          gameMoves[gameMoves.length - 1]["playTwo"] = updateGameMoves(piece, newPos, false, checkValue, checkmateValue, stalemateValue);
        }

        setTurn(turn === 1 ? 2 : 1);
        moveAudio();
      });

      // socket eat event
      socket.on("game:eat", ({ piece, prevPos, newPos, eatenPiece }) => {
        socketMove(box, playerNumber, piece, prevPos, newPos);

        // if transform pawn into queen
        if (pawnIntoQueen(piece, playerNumber, newPos)) piece = "queen";

        const { checkValue, checkmateValue, stalemateValue } = addEventsValues(2);

        if (playerNumber !== 1) {
          setGameMoves([
            ...gameMoves,
            {
              id: gameMoves.length,
              playOne: updateGameMoves(piece, newPos, true, checkValue, checkmateValue, stalemateValue),
            },
          ]);
        } else {
          gameMoves[gameMoves.length - 1]["playTwo"] = updateGameMoves(piece, newPos, true, checkValue, checkmateValue, stalemateValue);
        }

        setTurn(turn === 1 ? 2 : 1);
        eatAudio();

        // set eaten piece visible
        if (playerNumber === 1) setPlayerOnePiece([...playerOnePiece, eatenPiece]);
        if (playerNumber === 2) setPlayerTwoPiece([...playerTwoPiece, eatenPiece]);
      });

      // socket castle event
      socket.on("game:castle", ({ king, rook }) => {
        socketCastle(box, king, rook, gameMoves, setGameMoves);
        setTurn(turn === 1 ? 2 : 1);
        castlingAudio();
      });
    }

    if (socket && movingData.focusPiece && movingData.i !== null && movingData.id !== null && turn) {
      const { checkValue, checkmateValue, stalemateValue } = addEventsValues(1);

      const timeLeft = turn !== 1 ? timerOne : timerTwo;
      socket.emit("game:moving", { piece: movingData.focusPiece, prevPos: movingData.i, newPos: movingData.id, eatenPiece: movingData.eatenPiece, turn, checkValue, checkmateValue, stalemateValue, timeLeft });

      if (playerNumber === 1) {
        setGameMoves([
          ...gameMoves,
          {
            id: gameMoves.length,
            playOne: updateGameMoves(movingData.focusPiece, movingData.id, movingData.eatenPiece, checkValue, checkmateValue, stalemateValue),
          },
        ]);
      } else {
        gameMoves[gameMoves.length - 1]["playTwo"] = updateGameMoves(movingData.focusPiece, movingData.id, movingData.eatenPiece, checkValue, checkmateValue, stalemateValue);
      }

      setMovingData(emptyMovingData);
    }
  }, [turn, gameMoves, playerNumber]);

  // async useEffect turn dependencie
  useEffect(() => {
    // check if there is an equality
    if (box.length > 0 && turn === 1 && !checkMovement(box, 1) && !isKingCheck(box, 1, "menaceTwo") && isKingStuck(box, 1, 2, "menaceTwo")) {
      // delete socket room
      if (playerNumber === 1) socket.emit("game:finishing", { equality: true, timerOne, timerTwo: timerTwo - 1 });
      setResult(resultEquality(t));
      setDisplayModal(true);
      setTurn(null);
      stalemateAudio();
    }

    // check if there is an equality
    if (box.length > 0 && turn === 2 && !checkMovement(box, 2) && !isKingCheck(box, 2, "menaceOne") && isKingStuck(box, 2, 1, "menaceOne")) {
      // delete socket room
      if (playerNumber === 1) socket.emit("game:finishing", { equality: true, timerOne: timerOne - 1, timerTwo });
      setResult(resultEquality(t));
      setDisplayModal(true);
      setTurn(null);
      stalemateAudio();
    }

    // check if there is a checkmate
    if (box.length > 0 && turn === 1 && isKingCheck(box, 1, "menaceTwo") && !isDefensible(box, 1, 2, "menaceTwo") && isKingStuck(box, 1, 2, "menaceTwo")) {
      if (turn !== playerNumber) {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { winner: true, timerOne: timerOne - 1, timerTwo });
        setResult(resultWinner(t));
      } else {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { looser: true, timerOne, timerTwo: timerTwo - 1 });
        setResult(resultLooser(t));
      }

      setDisplayModal(true);
      setTurn(null);
      checkmateAudio();

      // check if there is a check
    } else if (box.length > 0 && turn === 1 && isKingCheck(box, 1, "menaceTwo")) {
      checkAudio();
    }

    // check if there is a checkmate
    if (box.length > 0 && turn === 2 && isKingCheck(box, 2, "menaceOne") && !isDefensible(box, 2, 1, "menaceOne") && isKingStuck(box, 2, 1, "menaceOne")) {
      if (turn !== playerNumber) {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { winner: true, timerOne: timerOne - 1, timerTwo });
        setResult(resultWinner(t));
      } else {
        // delete socket room
        if (playerNumber === 1) socket.emit("game:finishing", { looser: true, timerOne, timerTwo: timerTwo - 1 });
        setResult(resultLooser(t));
      }

      setDisplayModal(true);
      setTurn(null);
      checkmateAudio();

      // check if there is a check
    } else if (box.length > 0 && turn === 2 && isKingCheck(box, 2, "menaceOne")) {
      checkAudio();
    }

    setDecrementTimer(turn);
  }, [turn]);

  useEffect(() => {
    // start the timer
    if (turn === 1 && timerOne !== 0 && decrementTimer === 1) setTimeout(() => setTimerOne(timerOne - 1), 1000);
    if (turn === 2 && timerTwo !== 0 && decrementTimer === 2) setTimeout(() => setTimerTwo(timerTwo - 1), 1000);

    // fix state problem with late state update
    if (decrementTimer === 1 && !turn) setTimeout(() => setTimerOne(timerOne), 1000);
    if (decrementTimer === 2 && !turn) setTimeout(() => setTimerTwo(timerTwo), 1000);
    if (decrementTimer && !turn) setDecrementTimer(false);
  }, [turn, decrementTimer]);

  return (
    <div className={`grid${playerNumber === 2 ? " grid-inverse" : ""}`}>
      {box.map(({ id, player, piece, focus, choice, eat, castling, menaceOne, menaceTwo }) => (
        <Box key={id} id={id} player={player} piece={piece} focus={focus} choice={choice} eat={eat} castling={castling} menaceOne={menaceOne} menaceTwo={menaceTwo} turn={turn === playerNumber ? turn : 0} handleClick={() => handleBoxClick(id)} playerNumber={playerNumber} />
      ))}
      <Modal boolean={booleanModal} title={result.title} playerOneAvatar={playerOneData.avatar} playerOneUsername={playerOneData.username} playerTwoAvatar={playerTwoData.avatar} playerTwoUsername={playerTwoData.username} result={result.result} display={displayModal} setDisplay={setDisplayModal} inverse={playerNumber === 2} handleEqualityAccepted={handleEqualityAccepted} handleEqualityRefused={handleEqualityRefused} />
      <Loader displayLoader={displayLoader} waitingTime={waitingTime} playerNumber={playerNumber} />
    </div>
  );
}
