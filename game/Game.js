const Board = require("./Board");
const utils = require("./utils");
const uuidv4 = require("uuid/v4");

function Game(grid) {
  this.id = uuidv4();
  this.board = new Board(grid);

  this.white = {
    cards: [],
    captures: [],
    inCheck: false
  };

  this.black = {
    cards: [],
    captures: [],
    inCheck: false
  };

  this.opening = true;
  this.moveNumber = 1;
  this.currentPlayer = this.white;

  this.updateBoard();
}

Game.prototype.reset = function(grid) {
  this.board = new Board(grid);

  this.white = {
    cards: [],
    captures: [],
    inCheck: false
  };

  this.black = {
    cards: [],
    captures: [],
    inCheck: false
  };

  this.opening = true;
  this.moveNumber = 1;
  this.currentPlayer = this.white;

  this.updateBoard();
};

/* update the board with available moves */
Game.prototype.updateBoard = function() {
  for (let row = 0; row < this.board.nRows(); ++row) {
    for (let col = 0; col < this.board.nCols(); ++col) {
      if (this.board.isOccupiedPosition(row, col)) {
        let piece = this.board.positionAt(row, col);
        piece.updateMoves(this.board, row, col);
      }
    }
  }
};

/* execute a move */
Game.prototype.executeMove = function(row, col, dstRow, dstCol) {
  let piece = this.board.positionAt(row, col);

  this.board.clearPosition(row, col);

  /* If attacking, add it to current player's captures. */
  if (this.board.isOccupiedPosition(dstRow, dstCol)) {
    let target = this.board.positionAt(dstRow, dstCol);
    if (utils.areOppositeColors(piece, target)) {
      this.currentPlayer.captures.push(this.board.positionAt(dstRow, dstCol));
    }
  }

  this.board.setPosition(piece, dstRow, dstCol);

  if (piece.move) {
    piece.move();
  }

  /* update current player */
  this.currentPlayer =
    this.currentPlayer == this.white ? this.black : this.white;

  this.moveNumber++;

  /* TODO: maybe we just need to update the piece that moved instead of the entire board */
  this.updateBoard();
};

Game.prototype.getBoardState = function() {
  return this.board.grid;
};

module.exports = Game;
