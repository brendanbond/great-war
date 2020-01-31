const Board = require("./Board");
const King = require("./King");
const Pawn = require("./Pawn");
const utils = require("./utils");
const uuidv4 = require("uuid/v4");

function isOppositeColor(pieceA, pieceB) {
  return (
    (pieceA.color === "white" && pieceB.color === "black") ||
    (pieceA.color === "black" && pieceB.color === "white")
  );
}

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

/* update the board with available moves */
Game.prototype.updateBoard = function() {
  for (let row = 0; row < this.board.nRows(); ++row) {
    for (let col = 0; col < this.board.nCols(row); ++col) {
      if (this.board.isOccupiedPosition(row, col)) {
        let square = this.board.positionAt(row, col);
        square.getActions(this.board, row, col);
      }
    }
  }
};

/* validate a potential move */
/* TODO: do we need this? */
Game.prototype.validateMove = function(row, col, destRow, destCol) {
  let validMove = false;
  let actions = this.board.positionAt(row, col).actions;

  for (move of actions.moves) {
    if (utils.arraysAreEqual([destRow, destCol], move)) {
      validMove = true;
      break;
    }
  }

  if (actions.attacks && this.board.positionIsOccupied) {
    for (attack of actions.attacks) {
      if (utils.arraysAreEqual([destRow, destCol], attack)) {
        validMove = true;
        break;
      }
    }
  }

  return validMove;
};

/* execute a move */
Game.prototype.executeMove = function(row, col, destRow, destCol) {
  if (this.validateMove(row, col, destRow, destCol)) {
    let piece = this.board.positionAt(row, col);

    this.board.clearPosition(row, col);

    /* If attacking, add it to current player's captures. */
    if (this.board.isOccupiedPosition(row, col)) {
      let target = this.board.positionAt(row, col);
      if (isOppositeColor(piece, target)) {
        this.currentPlayer.captures.push(board.positionAt(destRow, destCol));
      }
    }

    this.board.setPosition(destRow, destCol, piece);

    if (piece.move) {
      piece.move();
    }

    /* update current player */
    this.currentPlayer =
      this.currentPlayer == this.white ? this.black : this.white;

    this.moveNumber++;

    /* TODO: maybe we just need to update the piece that moved instead of the entire board */
    this.updateBoard();
  } else {
    /* TODO: I'm not really clear on error checking and how we should handle */
    throw new Error("Move not valid.");
  }
};

Game.prototype.getBoardState = function() {
  return this.board.grid;
};

module.exports = Game;
