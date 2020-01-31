const uuidv4 = require("uuid/v4");
const Pawn = require("./Pawn");
const arraysAreEqual = require("./utils");

function King(color) {
  this.id = "K";
  this.color = color;
  this.actions = {
    moves: [
      [0, 1],
      [1, 0],
      [1, 1],
      [0, -1],
      [-1, 0],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ],
    attacks: null,
    opens: null
  };
}

function isOppositeColor(pieceA, pieceB) {
  return (
    (pieceA.color === "white" && pieceB.color === "black") ||
    (pieceA.color === "black" && pieceB.color === "white")
  );
}

//prettier-ignore
const DEFAULT_BOARD_SETUP = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black"), Pawn("black")],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1]
];

function Game(board) {
  this.id = uuidv4();
  this.board = board || DEFAULT_BOARD_SETUP;

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
  for (let row = 0; row < this.board.length; ++row) {
    for (let col = 0; col < this.board[row].length; ++col) {
      let square = this.board[row][col];
      if (square !== -1) {
        square.actions = square.getActions(this.board, row, col);
      }
    }
  }
};

/* validate a potential move */
Game.prototype.validateMove = function(row, col, destRow, destCol) {
  let validMove = false;
  let actions = this.board[row][col].actions;

  for (move of actions.moves) {
    if (arraysAreEqual([destRow, destCol], move)) {
      validMove = true;
      break;
    }
  }

  if (actions.attacks && this.board[destRow][destCol] != -1) {
    for (attack of actions.attacks) {
      if (arraysAreEqual([destRow, destCol], attack)) {
        validMove = true;
        break;
      }
    }
  }

  return validMove;
};

/* execute a move */
Game.prototype.executeMove = function(piece, row, col, destRow, destCol) {
  this.opening = this.moveNumber <= 2;

  if (this.validateMove(row, col, destRow, destCol)) {
    let dest = this.board[destRow][destCol];

    this.board[row][col] = -1;

    /* If attacking, add it to current player's captures. */
    if (dest !== -1) {
      let target = this.board[row][col];
      if (isOppositeColor(piece, target)) {
        this.currentPlayer.captures.push(board[destRow][destCol]);
      }
    }

    this.board[destRow][destCol] = piece;

    this.currentPlayer =
      this.currentPlayer == this.white ? this.black : this.white;
    this.moveNumber++;
    this.updateBoard();
  } else {
    /* TODO: I'm not really clear on error checking and how we should handle */
    throw new Error("Move not valid.");
  }
};

module.exports = Game;
