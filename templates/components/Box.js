import React, { useEffect, useState } from "react";
import IconQueen from "../../public/icons/pieces/chess-queen.svg";
import IconKing from "../../public/icons/pieces/chess-king.svg";
import IconBishop from "../../public/icons/pieces/chess-bishop.svg";
import IconKnight from "../../public/icons/pieces/chess-knight.svg";
import IconRook from "../../public/icons/pieces/chess-rook.svg";
import IconPawn from "../../public/icons/pieces/chess-pawn.svg";
import IconCircle from "../../public/icons/circle.svg";

export default function Box({ id, player, piece, focus, choice, eat, castling, menaceOne, menaceTwo, turn, handleClick, playerNumber }) {
  const [color, setColor] = useState(1);
  const [coordinateX, setCoordinateX] = useState("");
  const [coordinateY, setCoordinateY] = useState("");

  // print Y coordinates on the board
  const printCoordinateY = (one, two, three, four, five, six, seven, eight) => {
    if (id === one) setCoordinateY(8);
    if (id === two) setCoordinateY(7);
    if (id === three) setCoordinateY(6);
    if (id === four) setCoordinateY(5);
    if (id === five) setCoordinateY(4);
    if (id === six) setCoordinateY(3);
    if (id === seven) setCoordinateY(2);
    if (id === eight) setCoordinateY(1);
  };

  // print X coordinates on the board
  const printCoordinateX = (one, two, three, four, five, six, seven, eight) => {
    if (id === one) setCoordinateX("A");
    if (id === two) setCoordinateX("B");
    if (id === three) setCoordinateX("C");
    if (id === four) setCoordinateX("D");
    if (id === five) setCoordinateX("E");
    if (id === six) setCoordinateX("F");
    if (id === seven) setCoordinateX("G");
    if (id === eight) setCoordinateX("H");
  };

  useEffect(() => {
    // reset box coordinate
    setCoordinateY(null);
    setCoordinateX(null);

    // set color of every box
    if ((id < 8 && id % 2 === 0) || (id >= 8 && id < 16 && id % 2 === 1) || (id >= 16 && id < 24 && id % 2 === 0) || (id >= 24 && id < 32 && id % 2 === 1) || (id >= 32 && id < 40 && id % 2 === 0) || (id >= 40 && id < 48 && id % 2 === 1) || (id >= 48 && id < 56 && id % 2 === 0) || (id >= 56 && id % 2 === 1)) setColor(2);

    // print coordinates to player one
    if (playerNumber === 1) {
      printCoordinateY(0, 8, 16, 24, 32, 40, 48, 56);
      printCoordinateX(56, 57, 58, 59, 60, 61, 62, 63);
    } else if (playerNumber === 2) {
      // print coordinates to player two
      printCoordinateY(7, 15, 23, 31, 39, 47, 55, 63);
      printCoordinateX(0, 1, 2, 3, 4, 5, 6, 7);
    } else {
      setCoordinateY(null);
      setCoordinateX(null);
    }
  }, [playerNumber]);

  return (
    <div id={id} className={`box${color % 2 === 0 ? " box-color-one" : " box-color-two"}${(turn !== null && player === turn) || choice || eat ? " box-pointer" : ""}${focus ? " box-focus" : ""}`} onClick={handleClick} tabIndex={0}>
      {piece === "queen" && <IconQueen className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}
      {piece === "king" && <IconKing className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}
      {piece === "bishop" && <IconBishop className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}
      {piece === "knight" && <IconKnight className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}
      {piece === "rook" && <IconRook className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}
      {piece === "pawn" && <IconPawn className={`box-player${player === 1 ? " box-player-one" : ""}${player === 2 ? " box-player-two" : ""}`} />}

      {coordinateY && <span className={`box-coordinate-number${color === 1 ? " box-coordinate-one" : " box-coordinate-two"}`}>{coordinateY}</span>}
      {coordinateX && <span className={`box-coordinate-string${color === 1 ? " box-coordinate-one" : " box-coordinate-two"}`}>{coordinateX}</span>}

      {choice && <span className="box-choice" />}
      {eat && <IconCircle className="box-circle box-eat" />}
      {castling && <IconCircle className="box-circle box-castling" />}
      {/* {menaceOne && <IconCircle className="box-circle box-menace-one" />} */}
      {/* {menaceTwo && <IconCircle className="box-circle box-menace-two" />} */}
    </div>
  );
}
