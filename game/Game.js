const uuidv4 = require("uuid/v4");

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

function Pawn(color) {
  this.id = "P";
  this.color = color;
  if (this.color == "white") {
    this.actions = {
      moves: [[-1, 0]],
      attacks: [
        [-1, 1],
        [-1, -1]
      ],
      opens: [
        [-1, 0],
        [-2, 0]
      ]
    };
  } else {
    this.actions = {
      moves: [[1, 0]],
      attacks: [
        [1, 1],
        [1, -1]
      ],
      opens: [
        [1, 0],
        [2, 0]
      ]
    };
  }
}

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
    (pieceA.color == "white" && pieceB.color == "black") ||
    (pieceA.color == "black" && pieceB.color == "white")
  );
}

//prettier-ignore
const DEFAULT_BOARD_SETUP = [
  [-1, -1, -1, -1, new King("black"), -1, -1, -1, -1],
  [new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black")],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white")],
  [-1, -1, -1, -1, new King("white"), -1, -1, -1, -1]
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
      this.getActions(row, col);
    }
  }
};

/* get the available moves of a piece at row, col */
Game.prototype.getActions = function(row, col) {
  let piece = this.board[row][col];
  if (piece === -1) {
    return;
  }

  /* add in possible moves, including opens */
  if (piece.actions.moves) {
    piece.actions.moves = piece.actions.moves.reduce((moves, move) => {
      /* check that we're still on the board and that we're not running into occupied squares */
      if (
        row + move[0] >= 0 &&
        row + move[0] < this.board.length &&
        col + move[1] >= 0 &&
        col + move[1] < this.board[row].length &&
        this.board[row + move[0]][col + move[1]] == -1
      ) {
        // return [row + move[0], col + move[1]];
        moves.push([row + move[0], col + move[1]]);
      }
      return moves;
    }, []);
  }

  /* if the game is opening, add possible openings if applicable (i.e. pawns) */
  if (piece.actions.opens && this.opening) {
    piece.actions.opens = piece.actions.opens.reduce((opens, open) => {
      /* check that we're still on the board */
      if (
        row + open[0] >= 0 &&
        row + open[0] < this.board.length &&
        col + open[1] >= 0 &&
        col + open[1] < this.board[row].length
      ) {
        opens.push([row + open[0], col + open[1]]);
      }
      return opens;
    }, []);

    /* add opens to moves */
    for (open of piece.actions.opens) {
      piece.actions.moves.push(open);
    }
  }

  /* add in possible attacks if applicable */
  if (piece.actions.attacks) {
    piece.actions.attacks = piece.actions.attacks.reduce((attacks, attack) => {
      /* check that we're still on the board and that we're only attacking occupied squares */
      if (
        row + attack[0] >= 0 &&
        row + attack[0] < this.board.length &&
        col + attack[1] >= 0 &&
        col + attack[1] < this.board[row].length &&
        this.board[row + attack[0]][col + attack[1]] != -1
      ) {
        attacks.push([row + attack[0], col + attack[1]]);
      }
    }, []);
  }
};

/* validate a potential move */
Game.prototype.validateMove = function(row, col, destRow, destCol) {
  let validMove = false;
  let actions = this.board[row][col].actions;

  if (actions.opens && this.opening) {
    for (open of actions.opens) {
      if (arraysAreEqual([destRow, destCol], open)) {
        validMove = true;
        break;
      }
    }
  }

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
    if (dest != -1) {
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
