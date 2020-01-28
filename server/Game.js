const uuidv4 = require("uuid/v4");

function Pawn(color) {
  this.id = "P";
  this.color = color;
}

Pawn.prototype.possibleMoves = function() {
  if (this.color == "white") {
    return {
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
    return {
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
};

function King(color) {
  this.id = "K";
  this.color = color;
}

King.prototype.possibleMoves = function() {
  return {
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
};

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
}

Game.prototype.getPossibleMoves = function(piece, row, col) {
  /* if the game is opening, add possible openings if applicable (i.e. pawns) */
  if (piece.possibleMoves.opens && this.opening) {
    let opens = [];
    for (open of piece.opens) {
      /* check that we're still on the board */
      if (
        row + open[0] >= 0 &&
        row + open[0] < board.length &&
        col + open[1] >= 0 &&
        col + open[1] < board[row].length
      ) {
        opens.push([row + open[0], col + open[1]]);
      }
    }
  }

  /* add in possible moves */
  let moves = [];
  for (move of piece.possibleMoves.moves) {
    /* check that we're still on the board */
    if (
      row + move[0] >= 0 &&
      row + move[0] < board.length &&
      col + move[1] >= 0 &&
      col + move[1] < board[row].length
    ) {
      moves.push([row + move[0], col + move[1]]);
    }
  }

  /* add in possible attacks if applicable */
  if (piece.possibleMoves.attacks) {
    let attacks = [];
    for (attack of piece.possibleMoves.attacks) {
      /* check that we're still on the board and that we're only attacking occupied squares */
      if (
        row + attack[0] >= 0 &&
        row + attack[0] < board.length &&
        col + attack[1] >= 0 &&
        col + attack[1] < board[row].length &&
        board[row + attack[0]][col + attack[1]] != -1
      ) {
        attacks.push([row + attack[0], col + attack[1]]);
      }
    }
  }

  /* return possibleMoves object */
  return {
    opens: opens,
    moves: moves,
    attacks: attacks
  };
};

/* validate a potential move */
Game.prototype.validateMove = function(piece, row, col, destRow, destCol) {
  let validMove = false;
  let possibleMoves = this.possibleMoves(piece, row, col);

  if (possibleMoves.opens && opening) {
    for (open of possibleMoves.opens) {
      if ([destRow, destCol] == open) {
        validMove = true;
        break;
      }
    }
  }

  for (move of possibleMoves.moves) {
    if ([destRow, destCol] == move) {
      validMove = true;
      break;
    }
  }

  if (possibleMoves.attacks && board[destRow][destCol] != -1) {
    for (attack of possibleMoves.attacks) {
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
