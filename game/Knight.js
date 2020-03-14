const utils = require("./utils");
const Piece = require("./Piece");

function Knight(color) {
  Piece.call(this, "N", color);
  this.symbol = this.color == "white" ? "\u2658" : "\u265e";
}

Knight.prototype = Object.create(Piece.prototype);

Object.defineProperty(Knight.prototype, "constructor", {
  value: Knight,
  enumerable: false,
  writable: true
});

Knight.prototype.getActions = function(board, row, col) {
  let moves = [];

  /* down and right */
  if (board.isValidPosition(row + 2, col + 1)) {
    if (board.isOccupiedPosition(row + 2, col + 1)) {
      if (utils.areOppositeColors(row + 2, col + 1)) {
        moves.push([row + 2, col + 1]);
      }
    } else {
      moves.push([row + 2, col + 1]);
    }
  }

  /* down and left */
  if (board.isValidPosition(row + 2, col - 1)) {
    if (board.isOccupiedPosition(row + 2, col - 1)) {
      if (utils.areOppositeColors(row + 2, col - 1)) {
        moves.push([row + 2, col - 1]);
      }
    } else {
      moves.push([row + 2, col - 1]);
    }
  }

  /* up and right */
  if (board.isValidPosition(row - 2, col + 1)) {
    if (board.isOccupiedPosition(row - 2, col + 1)) {
      if (utils.areOppositeColors(row - 2, col + 1)) {
        moves.push([row - 2, col + 1]);
      }
    } else {
      moves.push([row - 2, col + 1]);
    }
  }

  /* up and left */
  if (board.isValidPosition(row - 2, col - 1)) {
    if (board.isOccupiedPosition(row - 2, col - 1)) {
      if (utils.areOppositeColors(row - 2, col - 1)) {
        moves.push([row - 2, col - 1]);
      }
    } else {
      moves.push([row - 2, col - 1]);
    }
  }

  /* right and down */
  if (board.isValidPosition(row + 1, col + 2)) {
    if (board.isOccupiedPosition(row + 1, col + 2)) {
      if (utils.areOppositeColors(row + 1, col + 2)) {
        moves.push([row + 1, col + 2]);
      }
    } else {
      moves.push([row + 1, col + 2]);
    }
  }

  /* left and down */
  if (board.isValidPosition(row + 1, col - 2)) {
    if (board.isOccupiedPosition(row + 1, col - 2)) {
      if (utils.areOppositeColors(row + 1, col - 2)) {
        moves.push([row + 1, col - 2]);
      }
    } else {
      moves.push([row + 1, col - 2]);
    }
  }

  /* right and up */
  if (board.isValidPosition(row - 1, col + 2)) {
    if (board.isOccupiedPosition(row - 1, col + 2)) {
      if (utils.areOppositeColors(row - 1, col + 2)) {
        moves.push([row - 1, col + 2]);
      }
    } else {
      moves.push([row - 1, col + 2]);
    }
  }

  /* left and up */
  if (board.isValidPosition(row - 1, col - 2)) {
    if (board.isOccupiedPosition(row - 1, col - 2)) {
      if (utils.areOppositeColors(row - 1, col - 2)) {
        moves.push([row - 1, col - 2]);
      }
    } else {
      moves.push([row - 1, col - 2]);
    }
  }

  this.actions = { moves };
};

module.exports = Knight;
