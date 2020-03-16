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

Bishop.prototype.updateMoves = function(board, row, col) {
  /* down and right diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row + i, col + i)) {
      if (board.isOccupiedPosition(row + i, col + i)) {
        let target = board.positionAt(row + i, col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row + i, col + i]);
        }
        break;
      }
      this.moves.push([row + i, col + i]);
    }
  }

  /* up and left diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row - i, col - i)) {
      if (board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row - i, col - i]);
        }
        break;
      }
      this.moves.push([row - i, col - i]);
    }
  }

  /* down and left diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row + i, col - i)) {
      if (board.isOccupiedPosition(row + i, col - i)) {
        let target = board.positionAt(row + i, col - i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row + i, col - i]);
        }
        break;
      }
      this.moves.push([row + i, col - i]);
    }
  }

  /* up and right diagonal */
  for (let i = 1; i < board.nrows(); ++i) {
    if (board.isValidPosition(row - i, col + i)) {
      if (board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);
        if (utils.areOppositeColors(this, target)) {
          this.moves.push([row - i, col + i]);
        }
        break;
      }
      this.moves.push([row - i, col + i]);
    }
  }
};

module.exports = Bishop;
