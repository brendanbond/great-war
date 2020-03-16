const Board = require("./Board");
const Player = require("./Player");

const utils = require("./utils");
const uuidv4 = require("uuid/v4");

function Game() {
  this.id = uuidv4();
  this.reset();
}

Game.prototype.reset = function() {
  this.white = new Player("white");
  this.black = new Player("black");
  this.currentPlayer = this.white;

  // Add pieces to player arrays for quick and easy lookup.
  this.board = new Board();
  this.board.forEachPiece(piece => {
    if (piece.isWhite()) {
      this.white.addPiece(piece);
    } else {
      this.black.addPiece(piece);
    }
  });

  this.opening = true;
  this.moveNumber = 1;

  this.updateBoard();
};

/* update the board with available moves */
Game.prototype.updateBoard = function() {
  this.currentPlayer.forEachPiece(piece => {
    piece.clearMoves();

    if (!this.currentPlayer.inCheck) {
      piece.updateMoves(this.board);
      if (piece.hasKingInCheck(this.board)) {
        this.otherPlayer().inCheck = true;
        console.log(this.otherPlayer());
      }
    }
  });

  /* Update King last so that they have fully updated check info. */
  let king = this.currentPlayer.findKing();
  king.updateMoves(this.board);
};

/* execute a move */
Game.prototype.executeMove = function(row, col, dstRow, dstCol) {
  let piece = this.board.positionAt(row, col);

  this.board.clearPosition(row, col);

  /* If attacking, add it to current player's captures. */
  if (this.board.isOccupiedPosition(dstRow, dstCol)) {
    let target = this.board.positionAt(dstRow, dstCol);
    if (piece.isOppositeColor(target)) {
      this.currentPlayer.addCapture(target);
    }
  }

  this.board.setPosition(piece, dstRow, dstCol);

  // For pieces like pawns that change state upon moving.
  if (piece.move) {
    piece.move();
  }

  this.moveNumber++;
  this.switchPlayer();

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
