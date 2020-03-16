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

// Return the position of King of given color.
Game.prototype.findKing = function(color) {
  let pos = [];

  this.board.forEachPiece((piece, row, col) => {
    if (piece.id === "K" && piece.color === color) {
      pos.push(row, col);
    }
  });

  return pos;
};

/* update the board with available moves */
Game.prototype.updateBoard = function() {
  // King positions.
  let wkpos = this.findKing("white");
  let bkpos = this.findKing("black");
  let wking = this.board.positionAt(wkpos[0], wkpos[1]);
  let bking = this.board.positionAt(bkpos[0], bkpos[1]);

  this.board.forEachPiece((piece, row, col) => {
    piece.clearMoves();

    if (!this.currentPlayer.inCheck) {
      piece.updateMoves(this.board, row, col);
      if (piece.hasKingInCheck(this.board, row, col)) {
        this.otherPlayer().inCheck = true;
      }
    }
  });

  /* Update Kings last so that they have fully updated check info. */
  wking.updateMoves(this.board, wkpos[0], wkpos[1]);
  bking.updateMoves(this.board, bkpos[0], bkpos[1]);
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

  // For pieces like pawns that change state upon moving.
  if (piece.move) {
    piece.move();
  }

  this.switchPlayer();
  this.moveNumber++;
  this.updateBoard();
};

Game.prototype.otherPlayer = function() {
  return this.currentPlayer === this.white ? this.black : this.white;
};

Game.prototype.switchPlayer = function() {
  this.currentPlayer = this.otherPlayer();
};

Game.prototype.getBoardState = function() {
  return this.board.grid;
};

module.exports = Game;
