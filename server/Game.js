const uuidv4 = require("uuid/v4");

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
  this.updateBoard();

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
  if (piece == -1) {
    return;
  }

  /* if the game is opening, add possible openings if applicable (i.e. pawns) */
  if (piece.actions.opens && this.opening) {
    piece.actions.opens = piece.actions.opens.map(open => {
      /* check that we're still on the board */
      if (
        row + open[0] >= 0 &&
        row + open[0] < this.board.length &&
        col + open[1] >= 0 &&
        col + open[1] < this.board[row].length
      ) {
        return [row + open[0], col + open[1]];
      }
    });
  }

  /* add in possible moves */
  if (piece.actions.moves) {
    piece.actions.moves = piece.actions.moves.map(move => {
      /* check that we're still on the board and that we're not running into occupied squares */
      if (
        row + move[0] >= 0 &&
        row + move[0] < this.board.length &&
        col + move[1] >= 0 &&
        col + move[1] < this.board[row].length &&
        this.board[row + move[0]][col + move[1]] == -1
      ) {
        return [row + move[0], col + move[1]];
      }
      return [-1, -1];
    });
  }

  /* add in possible attacks if applicable */
  if (piece.actions.attacks) {
    piece.actions.attacks = piece.actions.attacks.map(attack => {
      /* check that we're still on the board and that we're only attacking occupied squares */
      if (
        row + attack[0] >= 0 &&
        row + attack[0] < this.board.length &&
        col + attack[1] >= 0 &&
        col + attack[1] < this.board[row].length &&
        this.board[row + attack[0]][col + attack[1]] != -1
      ) {
        return [row + attack[0], col + attack[1]];
      }
    });
  }
};

/* validate a potential move */
Game.prototype.validateMove = function(piece, row, col, destRow, destCol) {
  let validMove = false;
  let actions = this.getActions(piece, row, col);

  if (actions.opens && opening) {
    for (open of actions.opens) {
      if ([destRow, destCol] == open) {
        validMove = true;
        break;
      }
    }
  }

  for (move of actions.moves) {
    if ([destRow, destCol] == move) {
      validMove = true;
      break;
    }
  }

  if (actions.attacks && this.board[destRow][destCol] != -1) {
    for (attack of actions.attacks) {
      if ([destRow, destCol] == attack) {
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

  if (validateMove(piece, row, col, destRow, destCol)) {
    let dest = board[destRow][destCol];

    board[row][col] = -1;

    /* If attacking, add it to current player's captures. */
    if (dest != -1) {
      let target = board[row][col];
      if (isOppositeColor(piece, target)) {
        this.currentPlayer.captures.push(board[destRow][destCol]);
      }
    }

    board[destRow][destCol] = piece;

    this.currentPlayer =
      this.currentPlayer == this.white ? this.black : this.white;
    this.moveNumber++;
  } else {
    /* TODO: I'm not really clear on error checking and how we should handle */
    throw new Error("Move not valid.");
  }
};

module.exports = Game;
