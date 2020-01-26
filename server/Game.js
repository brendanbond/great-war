function Pawn(color) {
  this.color = color;
}

Pawn.prototype.possibleMoves = {
  moves: [[0, 1]],
  attacks: [
    [1, 1],
    [-1, 1]
  ],
  opens: [
    [0, 1],
    [0, 2]
  ]
};

function King(color) {
  this.color = color;
}

King.prototype.possibleMoves = {
  moves: [
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ]
};

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
    opening: true,
    captures: [],
    inCheck: false
  };

  this.black = {
    cards: [],
    opening: true,
    captures: [],
    inCheck: false
  };

  this.opening = true;
  this.moveNumber = 1;
}

Game.prototype.possibleMoves = (piece, row, col) => {
  possibleMoves = (piece, x, y) => {
    /* TODO: link piece (which will be an ID) to the object it corresponds to */

    /* if the game is opening, add possible openings if applicable (i.e. pawns) */
    if (piece.possibleMoves.opens && this.opening) {
      let opens = [];
      for (open of piece.opens) {
        /* check that we're still on the board */
        if (
          row + open[0] >= 0 &&
          row + open[0] < board[col].length &&
          col + open[1] >= 0 &&
          col + open[1] < board.length
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
        row + move[0] < board[y].length &&
        col + move[1] >= 0 &&
        col + move[1] < board.length
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
          row + attack[0] < board[y].length &&
          col + attack[1] >= 0 &&
          col + attack[1] < board.length &&
          board[row + attack[0]][col + attack[1]] != EMPTY
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
};
