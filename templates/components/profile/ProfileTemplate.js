import React, { useState, useEffect } from "react";
import ChessNav from "../chess/ChessNav";
import IconChessBoard from "../../../public/icons/chess-board.svg";
import ChessHistory from "../chess/ChessHistory";
import ProfileApi from "../../../pages/api/profile";
import { parseGameHistory } from "../../../utils/parsing.js";
import SearchInput from "../input/SearchInput";
import useTranslation from "next-translate/useTranslation";

export default function ProfileTemplate({ currentNav, setCurrentNav, username }) {
  const { t } = useTranslation("profile");

  const [history, setHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState("");

  const handleHistorySearch = async (e) => {
    if (e.key && e.key !== "Enter") return;
    const res = await ProfileApi.history({ search: historySearch, username: username });
    if (res.state) return setHistory(parseGameHistory(res.data, res.id, username));
  };

  // parties category
  useEffect(async () => {
    const res = await ProfileApi.history({ search: null, username: username });
    if (res.state) return setHistory(parseGameHistory(res.data, res.id, username));
  }, [username]);

  const navItem = [
    {
      icon: <IconChessBoard />,
      title: t("profile:profileNavHistory"),
    },
  ];

  return (
    <div className="chess-template-main profile-template">
      <ChessNav item={navItem} current={currentNav} setCurrent={setCurrentNav} />

      <div className="chess-template">
        <>
          {currentNav === 0 && (
            <div className="chess-template-history">
              <SearchInput value={historySearch} setValue={setHistorySearch} placeholder={t("profile:profileSearchPlaceholder")} handleSearch={handleHistorySearch} handleKeySearch={handleHistorySearch} />
              {history.map(({ id, playerOne, playerTwo, score, win, loose }) => (
                <ChessHistory key={id} playerOne={playerOne} playerTwo={playerTwo} score={score} win={win} loose={loose} />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
