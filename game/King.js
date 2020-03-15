const Piece = require("./Piece");
const Utils = require("./utils");

function King(color) {
  Piece.call(this, "K", color);
  this.symbol = this.color == "white" ? "\u2654" : "\u265a";
}

King.prototype = Object.create(Piece.prototype);

Object.defineProperty(King.prototype, "constructor", {
  value: King,
  enumerable: false,
  writable: true
});

King.prototype.offsets = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1]
];

King.prototype.updateMoves = function(board, row, col) {
  let dstRow, dstCol;

  this.moves = this.offsets
    .reduce((moves, offset) => {
      dstRow = row + offset[0];
      dstCol = col + offset[1];

      if (board.isEmptyPosition(dstRow, dstCol)) {
        moves.push([dstRow, dstCol]);
      }

      return moves;
    }, [])
    .filter(move => {
      // King can't move if it puts him in check.
      // NOTE: Can we make this more Brendan-style?
      for (let i = 0; i < board.pieces.length; ++i) {
        let piece = board.pieces[i];

        if (piece.killed || !this.isOppositeColor(piece)) {
          continue;
        }

        // Handle pieces with different attacks than moves.
        if (piece.attacks) {
          for (let j = 0; j < piece.attacks.length; ++j) {
            let attack = piece.attacks[j];
            if (Utils.arraysAreEqual(move, attack)) {
              return false;
            }
          }
        } else {
          for (let j = 0; j < piece.moves.length; ++j) {
            let pMove = piece.moves[j];
            if (Utils.arraysAreEqual(move, pMove)) {
              return false;
            }
          }
        }
      }

      return true;
    });
};

module.exports = King;
