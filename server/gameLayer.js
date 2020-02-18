const Game = require("./game/Game");

let games = {};

exports.createGame = () => {
  let newGame = new Game();
  games[newGame.id] = newGame;
};

exports.getGameList = () => {
  return Object.keys(games);
};

exports.getGameState = gameId => {
  if (!games[gameId]) {
    throw new Error("Tried to get game state for game that doesn't exits.");
  }

  return {
    id: gameId,
    board: games[gameId].board.grid,
    moveNumber: games[gameId].moveNumber,
    white: games[gameId].white,
    black: games[gameId].black,
    currentPlayer: games[gameId].currentPlayer,
    inProgress: games[gameId].inProgress
  };
};

exports.executeMove = ({ playerId, gameId, row, col, destRow, destCol }) => {
  if (!games[gameId]) {
    throw new Error("Tried to execute a move on a game that doesn't exist.");
  }

  if (games[gameId].currentPlayer.user !== playerId) {
    throw new Error("Tried to execute a move off turn.");
  }

  games[gameId].executeMove({ row, col, destRow, destCol });
};

exports.gameIsReadyToBegin = gameId => {
  console.log("We're checking if the game is ready to begin...");
  return games[gameId].prepareForStart();
};

exports.requestJoinGame = (playerId, gameId) => {
  if (!games[gameId]) {
    throw new Error("Tried to join game that doesn't exist.");
  }

  if (games[gameId].inProgress) {
    throw new Error("Tried to join game that is in progress.");
  }

  if (games[gameId].isFull) {
    throw new Error(
      "Tried to join a game that is full but not yet in progress."
    );
  }

  games[gameId].addPlayer(playerId);
};
