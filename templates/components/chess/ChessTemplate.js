import React, { useEffect, useState } from "react";
import ChessNav from "./ChessNav";
import IconBolt from "../../../public/icons/bolt.svg";
import IconSquareAdd from "../../../public/icons/square-add.svg";
import IconChessBoard from "../../../public/icons/chess-board.svg";
import NavBar from "../NavBar";
import SearchInput from "../input/SearchInput";
import ChessMove from "./ChessMove";
import Button from "../Button";
import GameApi from "../../../pages/api/game";
import { parseGameHistory } from "../../../utils/parsing";
import ChessHistory from "./ChessHistory";
import IconPause from "../../../public/icons/pause.svg";
import IconFlag from "../../../public/icons/flag.svg";
import IconPlay from "../../../public/icons/play.svg";
import IconRestart from "../../../public/icons/restart.svg";
import useTranslation from "next-translate/useTranslation";
import Edito from "../../layouts/Edito";

export default function ChessTemplate({ handleNewGameClick, gameMoves, currentNav, setCurrentNav, handleCancelGameClick, playerOneData, setToast, handleEqualityClick, handleSurrenderClick }) {
  const { t } = useTranslation("game");

  const [gameNavCurrent, setGameNavCurrent] = useState(0);

  const [gamesSearchValue, setGamesSearchValue] = useState("");

  const [history, setHistory] = useState([]);

  const handleGameNav = (index) => setGameNavCurrent(index);
  const handleKeyGameNav = (e, index) => e.key === "Enter" && setGameNavCurrent(index);

  const handleGamesSearch = async (e) => {
    if (e.key && e.key !== "Enter") return;
    const res = await GameApi.history({ search: gamesSearchValue });
    if (res.state) return setHistory(parseGameHistory(res.data, res.id, playerOneData.username));

    setToast({
      display: true,
      event: "alert",
      title: t("game:toastTitleErrorHistory"),
      text: t("game:toastTextErrorHistory"),
    });
  };

  const navItem = [
    {
      icon: <IconBolt />,
      title: t("game:templateNavParty"),
    },
    {
      icon: <IconSquareAdd />,
      title: t("game:templateNavNewGame"),
    },
    {
      icon: <IconChessBoard />,
      title: t("game:templateNavHistory"),
    },
  ];

  const gameNavItem = [t("game:templateGameNavMoves"), t("game:templateGameNavOptions")];

  // parties category
  useEffect(async () => {
    if (currentNav === 2 && !history.length) {
      const res = await GameApi.history({ search: null });

      if (res.state) return setHistory(parseGameHistory(res.data, res.id, playerOneData.username));

      setToast({
        display: true,
        event: "alert",
        title: t("game:toastTitleErrorHistory"),
        text: t("game:toastTextErrorHistory"),
      });
    }
  }, [currentNav]);

  return (
    <div className="chess-template-main">
      <ChessNav item={navItem} current={currentNav} setCurrent={setCurrentNav} />

      <div className="chess-template">
        {currentNav === 0 && (
          <>
            <NavBar item={gameNavItem} current={gameNavCurrent} handleClick={handleGameNav} handleKey={handleKeyGameNav} />
            {gameNavCurrent === 0 && (
              <>
                {gameMoves.map(({ id, playOne, playTwo }) => (
                  <ChessMove key={`chess-move-${id}`} turn={id + 1} playOne={playOne} playTwo={playTwo} />
                ))}
              </>
            )}

            {gameNavCurrent === 1 && (
              <>
                <div className="chess-template-inner">
                  <Button className="btn-secondary btn-block chess-template-inner-btn" onClick={handleEqualityClick}>
                    <div>
                      <IconPause />
                    </div>
                    <span>{t("game:templateBtnTitleEquality")}</span>
                  </Button>

                  <Button className="btn-secondary btn-block" onClick={handleSurrenderClick}>
                    <div>
                      <IconFlag />
                    </div>
                    <span>{t("game:templateBtnTitleSurrender")}</span>
                  </Button>

                  <div className="chess-template-inner-edito">
                    <Edito>
                      <h3>{t("game:templateInfoTitle")}</h3>
                      <p>{t("game:templateInfoMicro")}</p>
                      {/*TODO: webcam not done*/}
                      {/* <p>{t("game:templateInfoWebcam")}</p> */}
                    </Edito>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {currentNav === 1 && (
          <div className="chess-template-inner chess-template-border">
            <p className="chess-template-inner-title">{t("game:templateSearchGame")}</p>
            <Button className="btn-primary btn-block chess-template-inner-btn" onClick={handleNewGameClick}>
              <div>
                <IconPlay />
              </div>
              <span>{t("game:templateBtnTitlePlay")}</span>
            </Button>
            <Button className="btn-secondary btn-block" onClick={handleCancelGameClick}>
              <div>
                <IconRestart />
              </div>
              <span>{t("game:templateBtnTitleCancel")}</span>
            </Button>
          </div>
        )}

        {currentNav === 2 && (
          <div className="chess-template-border">
            <SearchInput value={gamesSearchValue} setValue={setGamesSearchValue} placeholder={t("game:templateSearchPlaceholder")} handleSearch={handleGamesSearch} handleKeySearch={handleGamesSearch} />
            {history.map(({ id, playerOne, playerTwo, score, win, loose }) => (
              <ChessHistory key={id} playerOne={playerOne} playerTwo={playerTwo} score={score} win={win} loose={loose} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
