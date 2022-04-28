import React from "react";
import IconRook from "../../../public/icons/pieces/chess-rook.svg";
import IconBishop from "../../../public/icons/pieces/chess-bishop.svg";
import IconKnight from "../../../public/icons/pieces/chess-knight.svg";
import IconQueen from "../../../public/icons/pieces/chess-queen.svg";
import IconKing from "../../../public/icons/pieces/chess-king.svg";

export default function ChessMovePlay({ play }) {
  return (
    <span className="chess-move-play">
      {play.piece !== "pawn" && (
        <div className={`chess-move-play-icon${play.piece !== "rook" && play.piece !== "bishop" && play.piece !== "knight" && play.piece !== "queen" && play.piece !== "king" ? " chess-move-play-icon-disabled" : ""}`}>
          {play.piece === "rook" && <IconRook />}
          {play.piece === "bishop" && <IconBishop />}
          {play.piece === "knight" && <IconKnight />}
          {play.piece === "queen" && <IconQueen />}
          {play.piece === "king" && <IconKing />}
        </div>
      )}
      {play.eat && "x"}
      {play.move}
      {play.check && "+"}
      {play.checkmate && "#"}
      {play.stalemate && "*"}
      {play.littleCastle && "O-O"}
      {play.bigCastle && "O-O-O"}
    </span>
  );
}
