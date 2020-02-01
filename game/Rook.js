const utils = require("./utils");

function Rook(color) {
  this.id = "R";
  this.color = color;
}

Rook.prototype.getActions = function(board, row, col) {
  let moves = [];

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
