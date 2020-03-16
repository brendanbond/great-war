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

Rook.prototype.updateMoves = function(board) {
  /* down */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row + i, this.col)) {
      if (board.isOccupiedPosition(this.row + i, this.col)) {
        let target = board.positionAt(this.row + i, this.col);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row + i, this.col]);
        }
        break;
      }
      this.moves.push([this.row + i, this.col]);
    }
  }

  /* up */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row - i, this.col)) {
      if (board.isOccupiedPosition(this.row - i, this.col)) {
        let target = board.positionAt(this.row - i, this.col);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row - i, this.col]);
        }
        break;
      }
      this.moves.push([this.row - i, this.col]);
    }
  }

  /* right */
  for (let i = 1; i < board.ncols(); ++i) {
    if (board.isValidPosition(this.row, this.col + i)) {
      if (board.isOccupiedPosition(this.row, this.col + i)) {
        let target = board.positionAt(this.row, this.col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row, this.col + i]);
        }
        break;
      }
      this.moves.push([this.row, this.col + i]);
    }
  }

  /* left */
  for (let i = 1; i < board.ncols(); ++i) {
    if (board.isValidPosition(this.row, this.col - i)) {
      if (board.isOccupiedPosition(this.row, this.col - i)) {
        let target = board.positionAt(this.row, this.col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row, this.col - i]);
        }
        break;
      }
      this.moves.push([this.row, this.col - i]);
    }
  }
};

module.exports = Rook;
