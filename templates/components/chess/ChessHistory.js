import React from "react";
import IconBolt from "../../../public/icons/bolt.svg";

export default function ChessHistory({ playerOne, playerTwo, score, win, loose }) {
  return (
    <div className="chess-history">
      <div className="chess-history-icon">
        <IconBolt />
      </div>
      <p className="chess-history-name">{playerOne}</p>
      <p className="chess-history-name">{playerTwo}</p>
      <p className={`chess-history-score${win ? " chess-history-score-win" : loose ? " chess-history-score-loose" : ""}`}>{score}</p>
    </div>
  );
}
