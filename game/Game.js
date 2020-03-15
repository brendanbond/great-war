const Board = require("./Board");
const utils = require("./utils");
const uuidv4 = require("uuid/v4");

function Game() {
  this.id = uuidv4();
  this.board = new Board();

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

Game.prototype.reset = function() {
  this.board = new Board();

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
  let wkrow, wkcol, bkrow, bkcol;
  this.board.forEachPiece((piece, row, col) => {
    // Find row and col of Kings.
    if (piece.id === "K" && piece.color === "white") {
      wkrow = row;
      wkcol = col;
    } else if (piece.id === "K" && piece.color === "black") {
      bkrow = row;
      bkcol = col;
    }
    piece.updateMoves(this.board, row, col);
  });

  // Update Kings last.
  this.board.positionAt(wkrow, wkcol).updateMoves(this.board, wkrow, wkcol);
  this.board.positionAt(bkrow, bkcol).updateMoves(this.board, bkrow, bkcol);
};

/* execute a move */
Game.prototype.executeMove = function(row, col, dstRow, dstCol) {
  let piece = this.board.positionAt(row, col);

  this.board.clearPosition(row, col);

  /* If attacking, add it to current player's captures. */
  if (this.board.isOccupiedPosition(dstRow, dstCol)) {
    let target = this.board.positionAt(dstRow, dstCol);
    if (piece.isOppositeColor(target)) {
      this.currentPlayer.captures.push(this.board.positionAt(dstRow, dstCol));
    }
  }

  this.board.setPosition(piece, dstRow, dstCol);

  /* update current player */
  this.currentPlayer =
    this.currentPlayer == this.white ? this.black : this.white;

  this.moveNumber++;

  this.updateBoard();
};

Game.prototype.getBoardState = function() {
  return this.board.grid;
};

module.exports = Game;
