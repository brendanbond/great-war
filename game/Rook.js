const utils = require("./utils");
const Piece = require("./Piece");

function Rook(color) {
  Piece.call("R", color);
  this.symbol = this.color == "white" ? "\u2656" : "\u265c";
}

Rook.prototype = Object.create(Piece.prototype);

Object.defineProperty(Rook.prototype, "constructor", {
  value: Rook,
  enumerable: false,
  writable: true
});

Rook.prototype.getActions = function(board, row, col) {
  let moves = [];

  /* down */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row + i, col)) {
      if (board.isOccupiedPosition(row + i, col)) {
        let target = board.positionAt(row + i, col);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row + i, col]);
        }
        break;
      }
      moves.push([row + i, col]);
    }
  }

  /* up */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row - i, col)) {
      if (board.isOccupiedPosition(row - i, col)) {
        let target = board.positionAt(row - i, col);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row - i, col]);
        }
        break;
      }
      moves.push([row - i, col]);
    }
  }

  /* right */
  for (let i = 1; i < board.nCols(); ++i) {
    if (board.isValidPosition(row, col + i)) {
      if (board.isOccupiedPosition(row, col + i)) {
        let target = board.positionAt(row, col + i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row, col + i]);
        }
        break;
      }
      moves.push([row, col + i]);
    }
  }

  /* left */
  for (let i = 1; i < board.nCols(); ++i) {
    if (board.isValidPosition(row, col - i)) {
      if (board.isOccupiedPosition(row, col - i)) {
        let target = board.positionAt(row, col - i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row, col - i]);
        }
        break;
      }
      moves.push([row, col - i]);
    }
  }

  this.actions = { moves };
};

module.exports = Rook;
