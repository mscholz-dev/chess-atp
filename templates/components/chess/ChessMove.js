import React from "react";
import ChessMovePlay from "./ChessMovePlay";

export default function ChessMove({ turn, playOne, playTwo }) {
  return (
    <div className="chess-move">
      <span className="chess-move-turn">{turn}.</span>
      {playOne && <ChessMovePlay play={playOne} />}
      {playTwo && <ChessMovePlay play={playTwo} />}
    </div>
  );
}
