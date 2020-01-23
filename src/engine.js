function engine() {
  /* engine constants */
  const BLACK = "b";
  const WHITE = "w";
  const EMPTY = -1;
  const PAWN = "p";
  const KNIGHT = "k";
  const BISHOP = "b";
  const ROOK = "r";
  const QUEEN = "q";
  const KING = "k";

  /* engine objects */
  let board = [
    [EMPTY, EMPTY, EMPTY, EMPTY, KING, EMPTY, EMPTY, EMPTY, EMPTY],
    [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
    [EMPTY, EMPTY, EMPTY, EMPTY, KING, EMPTY, EMPTY, EMPTY, EMPTY]
  ];

  let white = {
    cards: [],
    opening: true,
    captures: [],
    castling: false
  };

  let black = {
    cards: [],
    opening: true,
    captures: [],
    castling: false
  };

  const Pawn = {
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

  const King = {
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
    attacks: [
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

  /* engine booleans and counters */
  let turn = WHITE;
  let moveNumber = 1;

  /* engine functions */
  const possibleMoves = (piece, x, y) => {
    /* if the game is opening, add possible openings */
    let opens = [];
    if (opening) {
      for (open of piece.opens) {
        /* check that we're still on the board */
        if (
          x + open[0] >= 0 &&
          x + open[0] < board[y].length &&
          y + open[1] >= 0 &&
          y + open[1] < board.length
        ) {
          opens.push([x + open[0], y + open[1]]);
        }
      }
    }

    /* add in possible moves */
    let moves = [];
    for (move of piece.moves) {
      /* check that we're still on the board */
      if (
        x + move[0] >= 0 &&
        x + move[0] < board[y].length &&
        y + move[1] >= 0 &&
        y + move[1] < board.length
      ) {
        moves.push([x + move[0], y + move[1]]);
      }
    }

    /* add in possible attacks */
    let attacks = [];
    for (attack of piece.attacks) {
      /* check that we're still on the board */
      if (
        x + attack[0] >= 0 &&
        x + attack[0] < board[y].length &&
        y + attack[1] >= 0 &&
        y + attack[1] < board.length
      ) {
        attacks.push([x + attack[0], y + attack[1]]);
      }
    }

    /* return possibleMoves object */
    return {
      opens: opens,
      moves: moves,
      attacks: attacks
    };
  };
}

export default engine;
