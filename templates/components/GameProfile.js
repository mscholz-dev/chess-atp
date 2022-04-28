import React, { useEffect, useState } from "react";
import Stopwatch from "../components/Stopwatch.js";
import IconQueen from "../../public/icons/pieces/chess-queen.svg";
import IconBishop from "../../public/icons/pieces/chess-bishop.svg";
import IconKnight from "../../public/icons/pieces/chess-knight.svg";
import IconRook from "../../public/icons/pieces/chess-rook.svg";
import IconPawn from "../../public/icons/pieces/chess-pawn.svg";
import { convertSecondInMinute } from "../../utils/date.js";

export default function GameProfile({ imgSrc, imgAlt, name, time, current, pieces }) {
  const [pawn, setPawn] = useState([]);
  const [rook, setRook] = useState([]);
  const [knight, setKnight] = useState([]);
  const [bishop, setBishop] = useState([]);
  const [queen, setQueen] = useState([]);

  const [needle, setNeedle] = useState(0);

  useEffect(() => {
    setNeedle(needle + 1);
  }, [time]);

  useEffect(() => {
    let pawnA = [],
      rookA = [],
      knightA = [],
      bishopA = [],
      queenA = [];

    let pawnC = 0,
      rookC = 0,
      knightC = 0,
      bishopC = 0,
      queenC = 0;

    pieces.forEach((piece) => {
      switch (piece) {
        case "pawn":
          pawnA.push(pawnC);
          pawnC++;
          break;
        case "rook":
          rookA.push(rookC);
          rookC++;
          break;
        case "knight":
          knightA.push(knightC);
          knightC++;
          break;
        case "bishop":
          bishopA.push(bishopC);
          bishopC++;
          break;
        case "queen":
          queenA.push(queenC);
          queenC++;
          break;
        default:
          break;
      }
    });

    setPawn(pawnA);
    setRook(rookA);
    setKnight(knightA);
    setBishop(bishopA);
    setQueen(queenA);
  }, [pieces]);

  return (
    <div className={`game-profile${current ? " game-profile-current" : ""}`}>
      <div className="game-profile-info">
        <img src={imgSrc} alt={imgAlt} className="game-profile-avatar" />
        <div className="game-profile-info-content">
          <span className="game-profile-name">{name}</span>
          <span className="game-profile-piece">
            {pawn.length ? (
              <div className="game-profile-piece-item">
                {pawn.map((item) => (
                  <div key={item} className="game-profile-piece-icon">
                    <IconPawn />
                  </div>
                ))}
              </div>
            ) : null}

            {rook.length ? (
              <div className="game-profile-piece-item">
                {rook.map((item) => (
                  <div key={item} className="game-profile-piece-icon">
                    <IconRook />
                  </div>
                ))}
              </div>
            ) : null}

            {knight.length ? (
              <div className="game-profile-piece-item">
                {knight.map((item) => (
                  <div key={item} className="game-profile-piece-icon">
                    <IconKnight />
                  </div>
                ))}
              </div>
            ) : null}

            {bishop.length ? (
              <div className="game-profile-piece-item">
                {bishop.map((item) => (
                  <div key={item} className="game-profile-piece-icon">
                    <IconBishop />
                  </div>
                ))}
              </div>
            ) : null}

            {queen.length ? (
              <div className="game-profile-piece-item">
                {queen.map((item) => (
                  <div key={item} className="game-profile-piece-icon">
                    <IconQueen />
                  </div>
                ))}
              </div>
            ) : null}
          </span>
        </div>
      </div>

      <div>
        <div className="game-profile-time">
          <Stopwatch needle={needle} />
          <span className="game-profile-time-text">{convertSecondInMinute(time)}</span>
        </div>
      </div>
    </div>
  );
}
