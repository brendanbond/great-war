const utils = require("./utils");

function Bishop(color) {
  this.id = "B";
  this.color = color;
}

Bishop.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };

  /* down and right diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row + i, col + i)) {
      if (board.isOccupiedPosition(row + i, col + i)) {
        let target = board.positionAt(row + i, col + i);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col + i]);
        }
        break;
      }
      actions.moves.push([row + i, col + i]);
    }
  }

  /* up and left diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row - i, col - i)) {
      if (board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col - i]);
        }
        break;
      }
      actions.moves.push([row - i, col - i]);
    }
  }

  /* down and left diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row + i, col - i)) {
      if (board.isOccupiedPosition(row + i, col - i)) {
        let target = board.positionAt(row + i, col - i);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col - i]);
        }
        break;
      }
      actions.moves.push([row + i, col - i]);
    }
  }

  /* up and right diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
    if (board.isValidPosition(row - i, col + i)) {
      if (board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col + i]);
        }
        break;
      }
      actions.moves.push([row - i, col + i]);
    }
  }

  this.actions = actions;
};

module.exports = Bishop;
