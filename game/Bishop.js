const utils = require("./utils");
const Piece = require("./Piece");

function Bishop(color) {
  Piece.call(this, "B", color);
  this.symbol = this.color == "white" ? "\u2657" : "\u265d";
}

Bishop.prototype = Object.create(Piece.prototype);

Object.defineProperty(Bishop.prototype, "constructor", {
  value: Bishop,
  enumerable: false,
  writable: true
});

Bishop.prototype.updateMoves = function(board) {
  /* down and right diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row + i, this.col + i)) {
      if (board.isOccupiedPosition(this.row + i, this.col + i)) {
        let target = board.positionAt(this.row + i, this.col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row + i, this.col + i]);
        }
        break;
      }
      this.moves.push([this.row + i, this.col + i]);
    }
  }

  /* up and left diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row - i, this.col - i)) {
      if (board.isOccupiedPosition(this.row - i, this.col - i)) {
        let target = board.positionAt(this.row - i, this.col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row - i, this.col - i]);
        }
        break;
      }
      this.moves.push([this.row - i, this.col - i]);
    }
  }

  /* down and left diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row + i, this.col - i)) {
      if (board.isOccupiedPosition(this.row + i, this.col - i)) {
        let target = board.positionAt(this.row + i, this.col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row + i, this.col - i]);
        }
        break;
      }
      this.moves.push([this.row + i, this.col - i]);
    }
  }

  /* up and right diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(this.row - i, this.col + i)) {
      if (board.isOccupiedPosition(this.row - i, this.col + i)) {
        let target = board.positionAt(this.row - i, this.col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([this.row - i, this.col + i]);
        }
        break;
      }
      this.moves.push([this.row - i, this.col + i]);
    }
  }
};

module.exports = Bishop;
