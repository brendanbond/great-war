const utils = require("./utils");
const Piece = require("./Piece");

function Rook(color) {
  Piece.call(this, "R", color);
  this.symbol = this.color == "white" ? "\u2656" : "\u265c";
}

Rook.prototype = Object.create(Piece.prototype);

Object.defineProperty(Rook.prototype, "constructor", {
  value: Rook,
  enumerable: false,
  writable: true
});

Rook.prototype.updateMoves = function(board, row, col) {
  this.moves = [];

  /* down */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row + i, col)) {
      if (board.isOccupiedPosition(row + i, col)) {
        let target = board.positionAt(row + i, col);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row + i, col]);
        }
        break;
      }
      this.moves.push([row + i, col]);
    }
  }

  /* up */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row - i, col)) {
      if (board.isOccupiedPosition(row - i, col)) {
        let target = board.positionAt(row - i, col);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row - i, col]);
        }
        break;
      }
      this.moves.push([row - i, col]);
    }
  }

  /* right */
  for (let i = 1; i < board.ncols(); ++i) {
    if (board.isValidPosition(row, col + i)) {
      if (board.isOccupiedPosition(row, col + i)) {
        let target = board.positionAt(row, col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row, col + i]);
        }
        break;
      }
      this.moves.push([row, col + i]);
    }
  }

  /* left */
  for (let i = 1; i < board.ncols(); ++i) {
    if (board.isValidPosition(row, col - i)) {
      if (board.isOccupiedPosition(row, col - i)) {
        let target = board.positionAt(row, col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row, col - i]);
        }
        break;
      }
      this.moves.push([row, col - i]);
    }
  }
};

module.exports = Rook;
