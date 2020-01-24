module.exports = (function engine() {
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
    inCheck: false
  };

  let black = {
    cards: [],
    opening: true,
    captures: [],
    inCheck: false
  };

  const Pieces = {
    Pawn: {
      id: PAWN,
      moves: [[0, 1]],
      attacks: [
        [1, 1],
        [-1, 1]
      ],
      opens: [
        [0, 1],
        [0, 2]
      ]
    },
    King: {
      id: KING,
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
    }
  };

  /* engine booleans and counters */
  let turn = WHITE;
  let moveNumber = 1;

  /* engine functions */

  /* get the board state */
  const getBoardState = () => {
    return board;
  };

  /* calculate an array of possible moves */
  const possibleMoves = (piece, x, y) => {
    /* TODO: link piece (which will be an ID) to the object it corresponds to */

    /* if the game is opening, add possible openings if applicable (i.e. pawns) */
    if (piece.opens && opening) {
      let opens = [];
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

    /* add in possible attacks if applicable */
    if (piece.attacks) {
      let attacks = [];
      for (attack of piece.attacks) {
        /* check that we're still on the board and that we're only attacking occupied squares */
        if (
          x + attack[0] >= 0 &&
          x + attack[0] < board[y].length &&
          y + attack[1] >= 0 &&
          y + attack[1] < board.length &&
          board[x + attack[0]][y + attack[1]] != EMPTY
        ) {
          attacks.push([x + attack[0], y + attack[1]]);
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

  /* validate a move */
  const validateMove = (piece, x, y, destX, destY) => {
    /* check that the move is valid */
    let validMove = false;
    possibleMoves = possibleMoves(piece, x, y);
    if (possibleMoves.opens && opening) {
      for (open of possibleMoves.opens) {
        if ([destX, destY] == open) {
          validMove = true;
          break;
        }
      }
    }

    for (move of possibleMoves.moves) {
      if ([destX, destY] == move) {
        validMove = true;
        break;
      }
    }

    if (possibleMoves.attacks && board[destX][destY] != EMPTY) {
      for (attack of possibleMoves.attacks) {
        if ([destX, destY] == attack) {
          validMove = true;
          break;
        }
      }
    }

    return validMove;
  };

  /* execute a move */
  const move = (player, piece, x, y, destX, destY) => {
    if (validateMove(piece, x, y, destX, destY)) {
      board[x][y] = EMPTY;
      /* TODO: this is probably not the best way to handle attacks */
      if (board[destX][destY] != EMPTY) {
        player.captures.push(board[destX][destY]);
      }
      board[destX][destY] = piece.id;
      if (turn == WHITE) {
        turn = BLACK;
      } else {
        turn = WHITE;
      }
      moveNumber++;
    } else {
      /* TODO: I'm not really clear on error checking and how we should handle */
      throw new Error("Move not valid.");
    }
  };

  return {};
})();
