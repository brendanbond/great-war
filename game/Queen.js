const utils = require("./utils");

function Queen(color) {
  this.id = "Q";
  this.color = color;
}

Queen.prototype.getActions = function(board, row, col) {
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

  /* down and right diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row + i, col + i)) {
      if (board.isOccupiedPosition(row + i, col + i)) {
        let target = board.positionAt(row + i, col + i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row + i, col + i]);
        }
        break;
      }
      moves.push([row + i, col + i]);
    }
  }

  /* up and left diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row - i, col - i)) {
      if (board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row - i, col - i]);
        }
        break;
      }
      moves.push([row - i, col - i]);
    }
  }

  /* down and left diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row + i, col - i)) {
      if (board.isOccupiedPosition(row + i, col - i)) {
        let target = board.positionAt(row + i, col - i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row + i, col - i]);
        }
        break;
      }
      moves.push([row + i, col - i]);
    }
  }

  /* up and right diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row - i, col + i)) {
      if (board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);
        if (utils.areOppositeColors(this, target)) {
          moves.push([row - i, col + i]);
        }
        break;
      }
      moves.push([row - i, col + i]);
    }
  }

  this.actions = { moves };
};

module.exports = Queen;
