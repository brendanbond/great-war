const Board = require("./Board");
const utils = require("./utils");
const shortid = require("shortid");

function Game(grid) {
  this.id = shortid();
  this.board = new Board(grid);

  this.white = {
    title: "White",
    user: null,
    captures: [],
    inCheck: false
  };

  this.black = {
    title: "Black",
    user: null,
    captures: [],
    inCheck: false
  };

  this.inProgress = false;
  this.isFull = false;
  this.moveNumber = 1;
  this.currentPlayer = this.white;

  this.updateBoard();
}

/* update the board with available moves */
Game.prototype.updateBoard = function() {
  for (let row = 0; row < this.board.nRows(); ++row) {
    for (let col = 0; col < this.board.nCols(); ++col) {
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

  for (let move of actions.moves) {
    if (utils.arraysAreEqual([destRow, destCol], move)) {
      validMove = true;
      break;
    }
  }

  if (actions.attacks && this.board.positionIsOccupied) {
    for (let attack of actions.attacks) {
      if (utils.arraysAreEqual([destRow, destCol], attack)) {
        validMove = true;
        break;
      }
    }
  }

  return validMove;
};

/* execute a move */
Game.prototype.executeMove = function({ row, col, destRow, destCol }) {
  if (this.validateMove(row, col, destRow, destCol)) {
    let piece = this.board.positionAt(row, col);

    this.board.clearPosition(row, col);

    /* If attacking, add it to current player's captures. */
    if (this.board.isOccupiedPosition(destRow, destCol)) {
      let target = this.board.positionAt(destRow, destCol);
      if (utils.areOppositeColors(piece, target)) {
        this.currentPlayer.captures.push(
          this.board.positionAt(destRow, destCol)
        );
      }
    }

    this.board.setPosition(destRow, destCol, piece);

    if (piece.move) {
      piece.move();
    }

    /* update current player */
    this.currentPlayer =
      this.currentPlayer === this.white ? this.black : this.white;

    this.moveNumber++;

    /* TODO: maybe we just need to update the piece that moved instead of the entire board */
    this.updateBoard();
  } else {
    /* TODO: I'm not really clear on error checking and how we should handle */
    throw new Error("Move not valid.");
  }
};

Game.prototype.addPlayer = function(playerId) {
  if (this.white.user === null) {
    this.white.user = playerId;
  } else {
    this.black.user = playerId;
    this.isFull = true;
  }
};

Game.prototype.prepareForStart = function() {
  console.log("Game is preparing to start...");
  if (!this.isFull) {
    console.log("Game is not full, waiting on another player...");
    return false;
  }
  this.currentPlayer = this.white;
  return true;
};

module.exports = Game;
