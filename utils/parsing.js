import { idToCoordinate } from "./grid";

const gameMovePatern = (item) => ({
  check: !!item.checking,
  checkmate: !!item.checkmating,
  eat: !!item.eating,
  move: idToCoordinate(item.new_pos),
  piece: item.piece,
  stalemate: !!item.stalemating,
});

const gameMoveCastlePatern = (name) => {
  switch (name) {
    case "castle_left_one":
      return { bigCastle: true };
    case "castle_right_one":
      return { littleCastle: true };
    case "castle_left_two":
      return { bigCastle: true };
    case "castle_right_two":
      return { littleCastle: true };
    default:
      break;
  }
};

export const parseGameMoves = (items) => {
  const array = [];

  items.map((item, index) => {
    // if playOne move
    if (index % 2 === 0) {
      if (item.name) return array.push({ id: index, playOne: gameMoveCastlePatern(item.name) });

      return array.push({ id: index, playOne: gameMovePatern(item) });
    }

    // if playTwo move
    if (item.name) return (array[array.length - 1]["playTwo"] = gameMoveCastlePatern(item.name));
    return (array[array.length - 1]["playTwo"] = gameMovePatern(item));
  });

  return array;
};

export const parseGameHistory = (items, playerId, username) => {
  const array = [];

  items.map((item, index) => {
    array.push({
      id: index,
      playerOne: playerId === item.player_one_id ? username : item.username,
      playerTwo: playerId === item.player_two_id ? username : item.username,
      score: item.score,
      win: (item.score === "1 - 0" && playerId === item.player_one_id) || (item.score === "0 - 1" && playerId === item.player_two_id),
      loose: (item.score === "1 - 0" && playerId === item.player_two_id) || (item.score === "0 - 1" && playerId === item.player_one_id),
    });
  });

  return array;
};
