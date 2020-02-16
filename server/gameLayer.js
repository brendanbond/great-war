const Game = require("./game/Game");
const Player = require("./game/Player");

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
    players: games[gameId].players,
    currentPlayer: games[gameId].currentPlayer,
    inProgress: games[gameId].inProgress
  };
};

exports.addPlayerToGame = (playerId, gameId) => {
  let player = new Player(playerId);
  games[gameId].players.push(player);
};

exports.executeMove = ({ gameId, row, col, destRow, destCol }) => {
  if (!games[gameId]) {
    throw new Error("Tried to execute move on a game that doesn't exist.");
  }

  games[gameId].executeMove({ row, col, destRow, destCol });
};

exports.gameIsReadyToBegin = gameId => {
  return games[gameId].players.length === 2;
};
