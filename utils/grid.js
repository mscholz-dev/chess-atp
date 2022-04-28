export const startGrid = (array) => {
  // for every boxes
  for (let i = 0; i < 64; i++) {
    let piece = null;
    let player = null;

    // set piece and player setting
    if (i === 56 || i === 63) {
      player = 1;
      piece = "rook";
    } else if (i === 57 || i === 62) {
      player = 1;
      piece = "knight";
    } else if (i === 58 || i === 61) {
      player = 1;
      piece = "bishop";
    } else if (i === 59) {
      player = 1;
      piece = "queen";
    } else if (i === 60) {
      player = 1;
      piece = "king";
    } else if (i >= 48 && i <= 55) {
      player = 1;
      piece = "pawn";
    } else if (i === 0 || i === 7) {
      player = 2;
      piece = "rook";
    } else if (i === 1 || i === 6) {
      player = 2;
      piece = "knight";
    } else if (i === 2 || i === 5) {
      player = 2;
      piece = "bishop";
    } else if (i === 3) {
      player = 2;
      piece = "queen";
    } else if (i === 4) {
      player = 2;
      piece = "king";
    } else if (i >= 8 && i <= 15) {
      player = 2;
      piece = "pawn";
    }

    // push setting of the box
    array.push({
      id: i,
      player: player,
      piece: piece,
      focus: false,
      choice: false,
      eat: false,
      castling: false,
      menaceOne: false,
      menaceTwo: false,
    });
  }

  // set menace of every piece in the board
  setMenace(array);

  return array;
};

// set moves for the player one pawn
export const setPawnMoveOne = (box, id) => {
  if (box[id - 8] && box[id - 8].player === null) box[id - 8].choice = true;
  if (box[id - 16] && box[id - 16].player === null && box[id - 8].player === null && id >= 48 && id <= 55) box[id - 16].choice = true;
  if (box[id - 9] && box[id - 9].player === 2 && (id - 9) % 8 !== 7) box[id - 9].eat = true;
  if (box[id - 7] && box[id - 7].player === 2 && (id - 7) % 8 !== 0) box[id - 7].eat = true;
};

// set moves for the player two pawn
export const setPawnMoveTwo = (box, id) => {
  if (box[id + 8] && box[id + 8].player === null) box[id + 8].choice = true;
  if (box[id + 16] && box[id + 16].player === null && box[id + 8].player === null && id >= 8 && id <= 15) box[id + 16].choice = true;
  if (box[id + 9] && box[id + 9].player === 1 && (id + 9) % 8 !== 0) box[id + 9].eat = true;
  if (box[id + 7] && box[id + 7].player === 1 && (id + 7) % 8 !== 7) box[id + 7].eat = true;
};

// set moves for the rook
export const setRookMove = (box, id, player, enemy) => {
  let endLeft = id - (id % 8);

  for (let i = id - 1; endLeft <= i; i--) {
    if (box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  let endRight = id + (7 - (id % 8));

  for (let i = id + 1; i <= endRight; i++) {
    if (box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  let endTop = id - 8 * Math.trunc(id / 8);

  for (let i = id - 8; i >= endTop; i -= 8) {
    if (box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  let endBottom = id + 8 * Math.ceil(7 - id / 8);
  for (let i = id + 8; i <= endBottom; i += 8) {
    if (box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }
};

// set moves for the knight
export const setKnightMove = (box, id, enemy) => {
  if (box[id - 17] && box[id - 17].player === null && (id - 17) % 8 !== 7) box[id - 17].choice = true;
  if (box[id - 17] && box[id - 17].player === enemy && (id - 17) % 8 !== 7) box[id - 17].eat = true;

  if (box[id - 15] && box[id - 15].player === null && (id - 15) % 8 !== 0) box[id - 15].choice = true;
  if (box[id - 15] && box[id - 15].player === enemy && (id - 15) % 8 !== 0) box[id - 15].eat = true;

  if (box[id - 10] && box[id - 10].player === null && (id - 10) % 8 !== 7 && (id - 10) % 8 !== 6) box[id - 10].choice = true;
  if (box[id - 10] && box[id - 10].player === enemy && (id - 10) % 8 !== 7 && (id - 10) % 8 !== 6) box[id - 10].eat = true;

  if (box[id - 6] && box[id - 6].player === null && (id - 6) % 8 !== 0 && (id - 6) % 8 !== 1) box[id - 6].choice = true;
  if (box[id - 6] && box[id - 6].player === enemy && (id - 6) % 8 !== 0 && (id - 6) % 8 !== 1) box[id - 6].eat = true;

  if (box[id + 6] && box[id + 6].player === null && (id + 6) % 8 !== 7 && (id + 6) % 8 !== 6) box[id + 6].choice = true;
  if (box[id + 6] && box[id + 6].player === enemy && (id + 6) % 8 !== 7 && (id + 6) % 8 !== 6) box[id + 6].eat = true;

  if (box[id + 10] && box[id + 10].player === null && (id + 10) % 8 !== 0 && (id + 10) % 8 !== 1) box[id + 10].choice = true;
  if (box[id + 10] && box[id + 10].player === enemy && (id + 10) % 8 !== 0 && (id + 10) % 8 !== 1) box[id + 10].eat = true;

  if (box[id + 15] && box[id + 15].player === null && (id + 15) % 8 !== 7) box[id + 15].choice = true;
  if (box[id + 15] && box[id + 15].player === enemy && (id + 15) % 8 !== 7) box[id + 15].eat = true;

  if (box[id + 17] && box[id + 17].player === null && (id + 17) % 8 !== 0) box[id + 17].choice = true;
  if (box[id + 17] && box[id + 17].player === enemy && (id + 17) % 8 !== 0) box[id + 17].eat = true;
};

// set moves for the bishop
export const setBishopMove = (box, id, player, enemy) => {
  //set left top move
  for (let i = id - 9; i > 0; i -= 9) {
    if (i % 8 === 7 || box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  //set right top move
  for (let i = id - 7; i > 0; i -= 7) {
    if (i % 8 === 0 || box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  //set left bottom move
  for (let i = id + 7; i < 64; i += 7) {
    if (i % 8 === 7 || box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }

  //set right bottom move
  for (let i = id + 9; i < 64; i += 9) {
    if (i % 8 === 0 || box[i].player === player) {
      break;
    } else if (box[i].player === enemy) {
      box[i].eat = true;
      break;
    } else {
      box[i].choice = true;
    }
  }
};

// set king moves
export const setKingMove = (box, id, enemy, fear) => {
  let playerValue = box[id].player;

  box[id].piece = null;
  box[id].player = null;

  setMenace(box);

  box[id].piece = "king";
  box[id].player = playerValue;

  if (box[id - 9] && box[id - 9].player === null && (id - 9) % 8 !== 7 && !box[id - 9][fear]) box[id - 9].choice = true;
  if (box[id - 9] && box[id - 9].player === enemy && (id - 9) % 8 !== 7 && !box[id - 9][fear]) box[id - 9].eat = true;

  if (box[id - 8] && box[id - 8].player === null && !box[id - 8][fear]) box[id - 8].choice = true;
  if (box[id - 8] && box[id - 8].player === enemy && !box[id - 8][fear]) box[id - 8].eat = true;

  if (box[id - 7] && box[id - 7].player === null && (id - 7) % 8 !== 0 && !box[id - 7][fear]) box[id - 7].choice = true;
  if (box[id - 7] && box[id - 7].player === enemy && (id - 7) % 8 !== 0 && !box[id - 7][fear]) box[id - 7].eat = true;

  if (box[id - 1] && box[id - 1].player === null && (id - 1) % 8 !== 7 && !box[id - 1][fear]) box[id - 1].choice = true;
  if (box[id - 1] && box[id - 1].player === enemy && (id - 1) % 8 !== 7 && !box[id - 1][fear]) box[id - 1].eat = true;

  if (box[id + 1] && box[id + 1].player === null && (id + 1) % 8 !== 0 && !box[id + 1][fear]) box[id + 1].choice = true;
  if (box[id + 1] && box[id + 1].player === enemy && (id + 1) % 8 !== 0 && !box[id + 1][fear]) box[id + 1].eat = true;

  if (box[id + 7] && box[id + 7].player === null && (id + 7) % 8 !== 7 && !box[id + 7][fear]) box[id + 7].choice = true;
  if (box[id + 7] && box[id + 7].player === enemy && (id + 7) % 8 !== 7 && !box[id + 7][fear]) box[id + 7].eat = true;

  if (box[id + 8] && box[id + 8].player === null && !box[id + 8][fear]) box[id + 8].choice = true;
  if (box[id + 8] && box[id + 8].player === enemy && !box[id + 8][fear]) box[id + 8].eat = true;

  if (box[id + 9] && box[id + 9].player === null && (id + 9) % 8 !== 0 && !box[id + 9][fear]) box[id + 9].choice = true;
  if (box[id + 9] && box[id + 9].player === enemy && (id + 9) % 8 !== 0 && !box[id + 9][fear]) box[id + 9].eat = true;
};

// reset moves settings
export const resetGridMove = (box) => {
  for (let i = 0; i < 64; i++) {
    box[i].focus = false;
    box[i].choice = false;
    box[i].eat = false;
    box[i].castling = false;
  }
};

// set player one left castling
export const castlingLeftOne = (box) => {
  if (box[57].player === null && box[58].player === null && box[59].player === null && (box[56].focus || box[60].focus) && !box[60].menaceTwo && !box[59].menaceTwo && !box[58].menaceTwo) {
    if (!box[60].focus) box[60].castling = true;
    if (!box[56].focus) box[56].castling = true;
  }
};

// set player one right castling
export const castlingRightOne = (box) => {
  if (box[61].player === null && box[62].player === null && (box[63].focus || box[60].focus) && !box[60].menaceTwo && !box[61].menaceTwo && !box[62].menaceTwo) {
    if (!box[60].focus) box[60].castling = true;
    if (!box[63].focus) box[63].castling = true;
  }
};

// set player two left castling
export const castlingLeftTwo = (box) => {
  if (box[1].player === null && box[2].player === null && box[3].player === null && (box[0].focus || box[4].focus) && !box[4].menaceOne && !box[3].menaceOne && !box[2].menaceOne) {
    if (!box[4].focus) box[4].castling = true;
    if (!box[0].focus) box[0].castling = true;
  }
};

// set player two right castling
export const castlingRightTwo = (box) => {
  if (box[5].player === null && box[6].player === null && (box[7].focus || box[4].focus) && !box[4].menaceOne && !box[5].menaceOne && !box[6].menaceOne) {
    if (!box[4].focus) box[4].castling = true;
    if (!box[7].focus) box[7].castling = true;
  }
};

// execute player one left castling
export const executeCastlingLeftOne = (box) => {
  box[60].piece = null;
  box[60].player = null;

  box[56].piece = null;
  box[56].player = null;

  box[58].piece = "king";
  box[58].player = 1;

  box[59].piece = "rook";
  box[59].player = 1;
};

// execute player one right castling
export const executeCastlingRightOne = (box) => {
  box[60].piece = null;
  box[60].player = null;

  box[63].piece = null;
  box[63].player = null;

  box[62].piece = "king";
  box[62].player = 1;

  box[61].piece = "rook";
  box[61].player = 1;
};

// execute player two left castling
export const executeCastlingLeftTwo = (box) => {
  box[4].piece = null;
  box[4].player = null;

  box[0].piece = null;
  box[0].player = null;

  box[2].piece = "king";
  box[2].player = 2;

  box[3].piece = "rook";
  box[3].player = 2;
};

// execute player two right castling
export const executeCastlingRightTwo = (box) => {
  box[4].piece = null;
  box[4].player = null;

  box[7].piece = null;
  box[7].player = null;

  box[6].piece = "king";
  box[6].player = 2;

  box[5].piece = "rook";
  box[5].player = 2;
};

// reset castling settings
export const resetAfterCastling = (box) => {
  for (let i = 0; i < 64; i++) {
    box[i].focus = false;
    box[i].choice = false;
    box[i].castling = false;
    box[i].menaceOne = false;
    box[i].menaceTwo = false;
  }
};

// set rook menace
const setMenaceRook = (box, i, menace) => {
  let endLeft = i - (i % 8);
  for (let j = i - 1; endLeft <= j; j--) {
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }
  let endRight = i + (7 - (i % 8));
  for (let j = i + 1; j <= endRight; j++) {
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }
  let endTop = i - 8 * Math.trunc(i / 8);
  for (let j = i - 8; j >= endTop; j -= 8) {
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }
  let endBottom = i + 8 * Math.ceil(7 - i / 8);
  for (let j = i + 8; j <= endBottom; j += 8) {
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }
};

// set bishop menace
const setMenaceBishop = (box, i, menace) => {
  //set left top move
  for (let j = i - 9; j > 0; j -= 9) {
    if (j % 8 === 7) break;
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }

  //set right top move
  for (let j = i - 7; j > 0; j -= 7) {
    if (j % 8 === 0) break;
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }

  //set left bottom move
  for (let j = i + 7; j < 64; j += 7) {
    if (j % 8 === 7) break;
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }

  //set right bottom move
  for (let j = i + 9; j < 64; j += 9) {
    if (j % 8 === 0) break;
    box[j][menace] = true;
    if (box[j].player !== null) break;
  }
};

// set knight menace
const setMenaceKnight = (box, i, menace) => {
  if (box[i - 17] && (i - 17) % 8 !== 7) box[i - 17][menace] = true;
  if (box[i - 15] && (i - 15) % 8 !== 0) box[i - 15][menace] = true;
  if (box[i - 10] && (i - 10) % 8 !== 7 && (i - 10) % 8 !== 6) box[i - 10][menace] = true;
  if (box[i - 6] && (i - 6) % 8 !== 0 && (i - 6) % 8 !== 1) box[i - 6][menace] = true;
  if (box[i + 6] && (i + 6) % 8 !== 7 && (i + 6) % 8 !== 6) box[i + 6][menace] = true;
  if (box[i + 10] && (i + 10) % 8 !== 0 && (i + 10) % 8 !== 1) box[i + 10][menace] = true;
  if (box[i + 15] && (i + 15) % 8 !== 7) box[i + 15][menace] = true;
  if (box[i + 17] && (i + 17) % 8 !== 0) box[i + 17][menace] = true;
};

// set king menace
const setMenaceKing = (box, i, menace) => {
  if (box[i - 9] && (i - 9) % 8 !== 7) box[i - 9][menace] = true;
  if (box[i - 8]) box[i - 8][menace] = true;
  if (box[i - 7] && (i - 7) % 8 !== 0) box[i - 7][menace] = true;
  if (box[i - 1] && (i - 1) % 8 !== 7) box[i - 1][menace] = true;
  if (box[i + 1] && (i + 1) % 8 !== 0) box[i + 1][menace] = true;
  if (box[i + 7] && (i + 7) % 8 !== 7) box[i + 7][menace] = true;
  if (box[i + 8]) box[i + 8][menace] = true;
  if (box[i + 9] && (i + 9) % 8 !== 0) box[i + 9][menace] = true;
};

// set menace of every pieces
export const setMenace = (box) => {
  for (let i = 0; i < 64; i++) {
    box[i].menaceOne = false;
    box[i].menaceTwo = false;
  }

  for (let i = 0; i < 64; i++) {
    if (box[i].piece === "pawn" && box[i].player === 1) {
      if (box[i - 9] && (i - 9) % 8 !== 7) box[i - 9].menaceOne = true;
      if (box[i - 7] && (i - 7) % 8 !== 0) box[i - 7].menaceOne = true;
    } else if (box[i].piece === "pawn" && box[i].player === 2) {
      if (box[i + 9] && (i + 9) % 8 !== 0) box[i + 9].menaceTwo = true;
      if (box[i + 7] && (i + 7) % 8 !== 7) box[i + 7].menaceTwo = true;
    } else if (box[i].piece === "rook") {
      if (box[i].player === 1) {
        setMenaceRook(box, i, "menaceOne");
      } else {
        setMenaceRook(box, i, "menaceTwo");
      }
    } else if (box[i].piece === "knight") {
      if (box[i].player === 1) {
        setMenaceKnight(box, i, "menaceOne");
      } else {
        setMenaceKnight(box, i, "menaceTwo");
      }
    } else if (box[i].piece === "bishop") {
      if (box[i].player === 1) {
        setMenaceBishop(box, i, "menaceOne");
      } else {
        setMenaceBishop(box, i, "menaceTwo");
      }
    } else if (box[i].piece === "queen") {
      if (box[i].player === 1) {
        setMenaceRook(box, i, "menaceOne");
        setMenaceBishop(box, i, "menaceOne");
      } else {
        setMenaceRook(box, i, "menaceTwo");
        setMenaceBishop(box, i, "menaceTwo");
      }
    } else if (box[i].piece === "king") {
      if (box[i].player === 1) {
        setMenaceKing(box, i, "menaceOne");
      } else {
        setMenaceKing(box, i, "menaceTwo");
      }
    }
  }
};

// is king check
export const isKingCheck = (box, player, menace) => {
  let functionReturn = false;

  setMenace(box);

  for (let i = 0; i < 64; i++) {
    if (box[i] && box[i].player === player && box[i].piece === "king" && box[i][menace]) {
      functionReturn = true;
      break;
    }
  }

  return functionReturn;
};

// revert the last action
export const revertTurn = (box, id, i, movePiece, movePlayer, focusPiece, turn) => {
  box[id].piece = movePiece;
  box[id].player = movePlayer;
  box[i].piece = focusPiece;
  box[i].player = turn;
};

// is current player can do a move
export const checkMovement = (box, player) => {
  if (player === 1) {
    for (let i = 0; i < 64; i++) {
      if (box[i].player === 1) {
        if (box[i].piece === "pawn") {
          setPawnMoveOne(box, i);
        } else if (box[i].piece === "rook") {
          setRookMove(box, i, 1, 2);
        } else if (box[i].piece === "knight") {
          setKnightMove(box, i, 2);
        } else if (box[i].piece === "bishop") {
          setBishopMove(box, i, 1, 2);
        } else if (box[i].piece === "queen") {
          setRookMove(box, i, 1, 2);
          setBishopMove(box, i, 1, 2);
        } else if (box[i].piece === "king") {
          setKingMove(box, i, 2, "menaceTwo");
        }
      }
    }
  } else {
    for (let i = 0; i < 64; i++) {
      if (box[i].player === 2) {
        if (box[i].piece === "pawn") {
          setPawnMoveTwo(box, i);
        } else if (box[i].piece === "rook") {
          setRookMove(box, i, 2, 1);
        } else if (box[i].piece === "knight") {
          setKnightMove(box, i, 1);
        } else if (box[i].piece === "bishop") {
          setBishopMove(box, i, 2, 1);
        } else if (box[i].piece === "queen") {
          setRookMove(box, i, 2, 1);
          setBishopMove(box, i, 2, 1);
        } else if (box[i].piece === "king") {
          setKingMove(box, i, 1, "menaceOne");
        }
      }
    }
  }

  let movement = false;
  for (let i = 0; i < 64; i++) {
    if (box[i].choice || box[i].eat) movement = true;
  }

  for (let i = 0; i < 64; i++) {
    box[i].choice = false;
    box[i].eat = false;
  }

  return movement;
};

// is the king is stuck
export const isKingStuck = (box, player, enemy, fear) => {
  for (let i = 0; i < 64; i++) {
    if (box[i].player === player && box[i].piece === "king") setKingMove(box, i, enemy, fear);
  }

  let kingStuck = true;
  for (let i = 0; i < 64; i++) {
    if (box[i].choice || box[i].eat) kingStuck = false;
  }

  for (let i = 0; i < 64; i++) {
    box[i].choice = false;
    box[i].eat = false;
  }
  return kingStuck;
};

// is the king is check
const checkKingMenace = (box, i, kingId, menace, attacker) => {
  const boxPlayer = box[i].player;
  const boxPiece = box[i].piece;

  const attackerPlayer = box[attacker].player;
  const attackerPiece = box[attacker].piece;

  box[i].player = null;
  box[i].piece = null;

  box[attacker].player = null;
  box[attacker].piece = null;

  setMenace(box);

  box[i].player = boxPlayer;
  box[i].piece = boxPiece;

  box[attacker].player = attackerPlayer;
  box[attacker].piece = attackerPiece;

  if (box[kingId][menace]) return true;

  return false;
};

// is the king can be protected
export const isDefensible = (box, player, enemy, menace) => {
  let kingId;
  for (let i = 0; i < 64; i++) {
    if (box[i].player === player && box[i].piece === "king") kingId = i;
  }

  let menaceArray = [];

  //check line menace
  let endLeft = kingId - (kingId % 8);
  for (let i = kingId - 1; endLeft <= i; i--) {
    if (box[i].player === enemy && (box[i].piece === "rook" || box[i].piece === "queen")) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endRight = kingId + (7 - (kingId % 8));
  for (let i = kingId + 1; i <= endRight; i++) {
    if (box[i].player === enemy && (box[i].piece === "rook" || box[i].piece === "queen")) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endTop = kingId - 8 * Math.trunc(kingId / 8);
  for (let i = kingId - 8; i >= endTop; i -= 8) {
    if (box[i].player === enemy && (box[i].piece === "rook" || box[i].piece === "queen")) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endBottom = kingId + 8 * Math.ceil(7 - kingId / 8);
  for (let i = kingId + 8; i <= endBottom; i += 8) {
    if (box[i].player === enemy && (box[i].piece === "rook" || box[i].piece === "queen")) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  //check diagonale menace
  for (let i = kingId - 9; i > 0; i -= 9) {
    if (i % 8 === 7) {
      break;
    } else if (box[i].player === enemy && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === kingId - 9 && box[i].piece === "pawn" && player === 1))) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = kingId - 7; i > 0; i -= 7) {
    if (i % 8 === 0) {
      break;
    } else if (box[i].player === enemy && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === kingId - 7 && box[i].piece === "pawn" && player === 1))) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = kingId + 7; i < 64; i += 7) {
    if (i % 8 === 7) {
      break;
    } else if (box[i].player === enemy && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === kingId + 7 && box[i].piece === "pawn" && player === 2))) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = kingId + 9; i < 64; i += 9) {
    if (i % 8 === 0) {
      break;
    } else if (box[i].player === enemy && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === kingId + 9 && box[i].piece === "pawn" && player === 2))) {
      menaceArray.push(i);
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  //check knight menace
  if (box[kingId - 17] && box[kingId - 17].player === enemy && box[kingId - 17].piece === "knight" && (kingId - 17) % 8 !== 7) menaceArray.push(kingId - 17);
  if (box[kingId - 15] && box[kingId - 15].player === enemy && box[kingId - 15].piece === "knight" && (kingId - 15) % 8 !== 0) menaceArray.push(kingId - 15);
  if (box[kingId - 10] && box[kingId - 10].player === enemy && box[kingId - 10].piece === "knight" && (kingId - 10) % 8 !== 7 && (kingId - 10) % 8 !== 6) menaceArray.push(kingId - 10);
  if (box[kingId - 6] && box[kingId - 6].player === enemy && box[kingId - 6].piece === "knight" && (kingId - 6) % 8 !== 0 && (kingId - 6) % 8 !== 1) menaceArray.push(kingId - 6);
  if (box[kingId + 6] && box[kingId + 6].player === enemy && box[kingId + 6].piece === "knight" && (kingId + 6) % 8 !== 7 && (kingId + 6) % 8 !== 6) menaceArray.push(kingId + 6);
  if (box[kingId + 10] && box[kingId + 10].player === enemy && box[kingId + 10].piece === "knight" && (kingId + 10) % 8 !== 0 && (kingId + 10) % 8 !== 1) menaceArray.push(kingId + 10);
  if (box[kingId + 15] && box[kingId + 15].player === enemy && box[kingId + 15].piece === "knight" && (kingId + 15) % 8 !== 7) menaceArray.push(kingId + 15);
  if (box[kingId + 17] && box[kingId + 17].player === enemy && box[kingId + 17].piece === "knight" && (kingId + 17) % 8 !== 0) menaceArray.push(kingId + 17);

  if (menaceArray.length > 1) return false;

  const attacker = menaceArray[0];

  //check if you can stop it
  let stopArray = [];
  let stoppable = false;

  menaceArray.forEach((item) => {
    if (box[item].piece === "rook" || box[item].piece === "queen") {
      let endLeftSecond = item - (item % 8);
      let endLeftSecondArray = [];
      for (let i = item - 1; endLeftSecond <= i; i--) {
        if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...endLeftSecondArray);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        endLeftSecondArray.push(i);
      }

      let endRightSecond = item + (7 - (item % 8));
      let endRightSecondArray = [];
      for (let i = item + 1; i <= endRightSecond; i++) {
        if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...endRightSecondArray);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        endRightSecondArray.push(i);
      }

      let endTopSecond = item - 8 * Math.trunc(item / 8);
      let endTopSecondArray = [];
      for (let i = item - 8; i >= endTopSecond; i -= 8) {
        if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...endTopSecondArray);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        endTopSecondArray.push(i);
      }

      let endBottomSecond = item + 8 * Math.ceil(7 - item / 8);
      let endBottomSecondArray = [];
      for (let i = item + 8; i <= endBottomSecond; i += 8) {
        if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...endBottomSecondArray);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        endBottomSecondArray.push(i);
      }
    }

    if (box[item].piece === "bishop" || box[item].piece === "queen") {
      let diagoOne = [];
      for (let i = item - 9; i > 0; i -= 9) {
        if (i % 8 === 7) {
          break;
        } else if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...diagoOne);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        diagoOne.push(i);
      }

      let diagoTwo = [];
      for (let i = item - 7; i > 0; i -= 7) {
        if (i % 8 === 0) {
          break;
        } else if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...diagoTwo);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        diagoTwo.push(i);
      }

      let diagoThree = [];
      for (let i = item + 7; i < 64; i += 7) {
        if (i % 8 === 7) {
          break;
        } else if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...diagoThree);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        diagoThree.push(i);
      }

      let diagoFour = [];
      for (let i = item + 9; i < 64; i += 9) {
        if (i % 8 === 0) {
          break;
        } else if (box[i].player === player && box[i].piece === "king") {
          stopArray.push(...diagoFour);
          break;
        } else if (box[i].player !== null) {
          break;
        }
        diagoFour.push(i);
      }
    }

    //chek if a piece can block the check
    stopArray.forEach((item) => {
      //check lines
      let endLeftSecond = item - (item % 8);
      for (let i = item - 1; endLeftSecond <= i; i--) {
        if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      let endRightSecond = item + (7 - (item % 8));
      for (let i = item + 1; i <= endRightSecond; i++) {
        if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      let endTopSecond = item - 8 * Math.trunc(item / 8);
      let topCounter = 0;
      for (let i = item - 8; i >= endTopSecond; i -= 8) {
        if (box[i].piece === "pawn" && topCounter === 0 && box[i].player === player) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].piece === "pawn" && topCounter === 1 && i >= 8 && i <= 15 && box[i].player === player) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
        topCounter++;
      }

      let endBottomSecond = item + 8 * Math.ceil(7 - item / 8);
      let bottomCounter = 0;
      for (let i = item + 8; i <= endBottomSecond; i += 8) {
        if (box[i].piece === "pawn" && bottomCounter === 0 && box[i].player === player) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].piece === "pawn" && bottomCounter === 1 && i >= 48 && i <= 55 && box[i].player === player) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
        bottomCounter++;
      }

      //check diagonale menace
      for (let i = item - 9; i > 0; i -= 9) {
        if (i % 8 === 7) {
          break;
        } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      for (let i = item - 7; i > 0; i -= 7) {
        if (i % 8 === 0) {
          break;
        } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      for (let i = item + 7; i < 64; i += 7) {
        if (i % 8 === 7) {
          break;
        } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      for (let i = item + 9; i < 64; i += 9) {
        if (i % 8 === 0) {
          break;
        } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen")) {
          if (checkKingMenace(box, i, kingId, menace, attacker)) return;
          stoppable = true;
          break;
        } else if (box[i].player !== null) {
          break;
        }
      }

      //check knight menace
      if (box[item - 17] && box[item - 17].player === player && box[item - 17].piece === "knight" && (item - 17) % 8 !== 7) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item - 15] && box[item - 15].player === player && box[item - 15].piece === "knight" && (item - 15) % 8 !== 0) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item - 10] && box[item - 10].player === player && box[item - 10].piece === "knight" && (item - 10) % 8 !== 7 && (item - 10) % 8 !== 6) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item - 6] && box[item - 6].player === player && box[item - 6].piece === "knight" && (item - 6) % 8 !== 0 && (item - 6) % 8 !== 1) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item + 6] && box[item + 6].player === player && box[item + 6].piece === "knight" && (item + 6) % 8 !== 7 && (item + 6) % 8 !== 6) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item + 10] && box[item + 10].player === player && box[item + 10].piece === "knight" && (item + 10) % 8 !== 0 && (item + 10) % 8 !== 1) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item + 15] && box[item + 15].player === player && box[item + 15].piece === "knight" && (item + 15) % 8 !== 7) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }

      if (box[item + 17] && box[item + 17].player === player && box[item + 17].piece === "knight" && (item + 17) % 8 !== 0) {
        if (checkKingMenace(box, item, kingId, menace, attacker)) return;
        stoppable = true;
      }
    });
  });
  if (stoppable) return true;

  //check if you can eat it
  const menaceId = menaceArray[0];
  let eatable = false;

  //check line menace
  let endLeftSecond = menaceId - (menaceId % 8);
  for (let i = menaceId - 1; endLeftSecond <= i; i--) {
    if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endRightSecond = menaceId + (7 - (menaceId % 8));
  for (let i = menaceId + 1; i <= endRightSecond; i++) {
    if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endTopSecond = menaceId - 8 * Math.trunc(menaceId / 8);
  for (let i = menaceId - 8; i >= endTopSecond; i -= 8) {
    if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  let endBottomSecond = menaceId + 8 * Math.ceil(7 - menaceId / 8);
  for (let i = menaceId + 8; i <= endBottomSecond; i += 8) {
    if (box[i].player === player && (box[i].piece === "rook" || box[i].piece === "queen")) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  //check diagonale menace
  for (let i = menaceId - 9; i > 0; i -= 9) {
    if (i % 8 === 7) {
      break;
    } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === menaceId - 9 && box[i].piece === "pawn"))) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = menaceId - 7; i > 0; i -= 7) {
    if (i % 8 === 0) {
      break;
    } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === menaceId - 7 && box[i].piece === "pawn"))) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = menaceId + 7; i < 64; i += 7) {
    if (i % 8 === 7) {
      break;
    } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === menaceId + 7 && box[i].piece === "pawn"))) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  for (let i = menaceId + 9; i < 64; i += 9) {
    if (i % 8 === 0) {
      break;
    } else if (box[i].player === player && (box[i].piece === "bishop" || box[i].piece === "queen" || (i === menaceId + 9 && box[i].piece === "pawn"))) {
      if (checkKingMenace(box, i, kingId, menace, attacker)) return;
      eatable = true;
      break;
    } else if (box[i].player !== null) {
      break;
    }
  }

  //check knight menace
  if (box[menaceId - 17] && box[menaceId - 17].player === player && box[menaceId - 17].piece === "knight" && (menaceId - 17) % 8 !== 7) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId - 15] && box[menaceId - 15].player === player && box[menaceId - 15].piece === "knight" && (menaceId - 15) % 8 !== 0) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId - 10] && box[menaceId - 10].player === player && box[menaceId - 10].piece === "knight" && (menaceId - 10) % 8 !== 7 && (menaceId - 10) % 8 !== 6) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId - 6] && box[menaceId - 6].player === player && box[menaceId - 6].piece === "knight" && (menaceId - 6) % 8 !== 0 && (menaceId - 6) % 8 !== 1) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId + 6] && box[menaceId + 6].player === player && box[menaceId + 6].piece === "knight" && (menaceId + 6) % 8 !== 7 && (menaceId + 6) % 8 !== 6) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId + 10] && box[menaceId + 10].player === player && box[menaceId + 10].piece === "knight" && (menaceId + 10) % 8 !== 0 && (menaceId + 10) % 8 !== 1) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId + 15] && box[menaceId + 15].player === player && box[menaceId + 15].piece === "knight" && (menaceId + 15) % 8 !== 7) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  if (box[menaceId + 17] && box[menaceId + 17].player === player && box[menaceId + 17].piece === "knight" && (menaceId + 17) % 8 !== 0) {
    if (checkKingMenace(box, menaceId, kingId, menace, attacker)) return;
    eatable = true;
  }

  return eatable;
};

export const pawnIntoQueen = (piece, playerNumber, newPos) => {
  if (piece === "pawn" && playerNumber === 2 && newPos >= 0 && newPos <= 7) return true;
  if (piece === "pawn" && playerNumber === 1 && newPos >= 56 && newPos <= 63) return true;
  return false;
};

// update when opponent move
export const socketMove = (box, playerNumber, piece, prevPos, newPos) => {
  // delete prev position
  box[prevPos].player = null;
  box[prevPos].piece = null;

  // add new position
  let player;
  playerNumber === 1 ? (player = 2) : (player = 1);
  box[newPos].player = player;

  // transform pawn in queen
  if (pawnIntoQueen(piece, playerNumber, newPos)) return (box[newPos].piece = "queen");
  box[newPos].piece = piece;
};

// delete prev position for castle
const castleDeletePos = (box, king, rook) => {
  box[king].player = null;
  box[king].piece = null;
  box[rook].player = null;
  box[rook].piece = null;
};

// add new position for castle
const castleAddPos = (box, king, rook, playerNumber) => {
  box[king].player = playerNumber;
  box[king].piece = "king";
  box[rook].player = playerNumber;
  box[rook].piece = "rook";
};

// update when opponent castle
export const socketCastle = (box, king, rook, gameMoves, setGameMoves) => {
  // player one right castle
  if (king === 62 && rook === 61) {
    castleDeletePos(box, 60, 63);
    castleAddPos(box, 62, 61, 1);
    setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { littleCastle: true } }]);
  } else if (king === 58 && rook === 59) {
    // player one left castle
    castleDeletePos(box, 60, 56);
    castleAddPos(box, 58, 59, 1);
    setGameMoves([...gameMoves, { id: gameMoves.length, playOne: { bigCastle: true } }]);
  } else if (king === 2 && rook === 3) {
    // player two left castle
    castleDeletePos(box, 4, 0);
    castleAddPos(box, 2, 3, 2);
    gameMoves[gameMoves.length - 1]["playTwo"] = { bigCastle: true };
  } else if (king === 6 && rook === 5) {
    // player two right castle
    castleDeletePos(box, 4, 7);
    castleAddPos(box, 6, 5, 2);
    gameMoves[gameMoves.length - 1]["playTwo"] = { littleCastle: true };
  }
};

export const idToCoordinate = (id) => {
  let letter;
  let number;

  if (id % 8 === 0) {
    letter = "a";
  } else if (id % 8 === 1) {
    letter = "b";
  } else if (id % 8 === 2) {
    letter = "c";
  } else if (id % 8 === 3) {
    letter = "d";
  } else if (id % 8 === 4) {
    letter = "e";
  } else if (id % 8 === 5) {
    letter = "f";
  } else if (id % 8 === 6) {
    letter = "g";
  } else {
    letter = "h";
  }

  if (id >= 56) {
    number = 1;
  } else if (id >= 48) {
    number = 2;
  } else if (id >= 40) {
    number = 3;
  } else if (id >= 32) {
    number = 4;
  } else if (id >= 24) {
    number = 5;
  } else if (id >= 16) {
    number = 6;
  } else if (id >= 8) {
    number = 7;
  } else {
    number = 8;
  }

  return `${letter}${number}`;
};

// for reset one box data
const resetUniqueBox = (box, id) => {
  box[id].player = null;
  box[id].piece = null;
};

export const restoreBoard = (newBox, moves) => {
  // variables
  const pieceEatOne = [];
  const pieceEatTwo = [];

  moves.map((item, index) => {
    // manage castle
    const name = item.name;
    if (name) {
      switch (name) {
        case "castle_left_one":
          // delete caslte prev pos
          resetUniqueBox(newBox, 56);
          resetUniqueBox(newBox, 60);

          // add new king pos
          newBox[58].player = 1;
          newBox[58].piece = "king";

          // add new rook pos
          newBox[59].player = 1;
          newBox[59].piece = "rook";
          break;
        case "castle_right_one":
          // delete caslte prev pos
          resetUniqueBox(newBox, 60);
          resetUniqueBox(newBox, 63);

          // add new rook pos
          newBox[61].player = 1;
          newBox[61].piece = "rook";

          // add new king pos
          newBox[62].player = 1;
          newBox[62].piece = "king";
          break;
        case "castle_left_two":
          // delete caslte prev pos
          resetUniqueBox(newBox, 0);
          resetUniqueBox(newBox, 4);

          // add new king pos
          newBox[2].player = 2;
          newBox[2].piece = "king";

          // add new rook pos
          newBox[3].player = 2;
          newBox[3].piece = "rook";
          break;
        case "castle_right_two":
          // delete caslte prev pos
          resetUniqueBox(newBox, 4);
          resetUniqueBox(newBox, 7);

          // add new rook pos
          newBox[5].player = 2;
          newBox[5].piece = "rook";

          // add new king pos
          newBox[6].player = 2;
          newBox[6].piece = "king";
          break;
        default:
          break;
      }
      return;
    }

    const prevPos = parseInt(item["prev_pos"]);
    const newPos = parseInt(item["new_pos"]);
    const piece = item.piece;
    const eating = item.eating;

    // remove piece prev pos
    newBox[prevPos].player = null;
    newBox[prevPos].piece = null;

    // add piece eaten in history
    if (eating && index % 2 === 0) pieceEatOne.push(newBox[newPos].piece);
    if (eating && index % 2 === 1) pieceEatTwo.push(newBox[newPos].piece);

    // add piece new pos
    newBox[newPos].player = index % 2 === 0 ? 1 : 2;
    newBox[newPos].piece = piece;
  });

  return { newBox, pieceEatOne, pieceEatTwo };
};
