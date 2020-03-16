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

Knight.prototype.updateMoves = function(board) {
  /* down and right */
  if (board.isValidPosition(this.row + 2, this.col + 1)) {
    if (board.isOccupiedPosition(this.row + 2, this.col + 1)) {
      if (utils.areOppositeColors(this.row + 2, this.col + 1)) {
        this.moves.push([this.row + 2, this.col + 1]);
      }
    } else {
      this.moves.push([this.row + 2, this.col + 1]);
    }
  }

  /* down and left */
  if (board.isValidPosition(this.row + 2, this.col - 1)) {
    if (board.isOccupiedPosition(this.row + 2, this.col - 1)) {
      if (utils.areOppositeColors(this.row + 2, this.col - 1)) {
        this.moves.push([this.row + 2, this.col - 1]);
      }
    } else {
      this.moves.push([this.row + 2, this.col - 1]);
    }
  }

  /* up and right */
  if (board.isValidPosition(this.row - 2, this.col + 1)) {
    if (board.isOccupiedPosition(this.row - 2, this.col + 1)) {
      if (utils.areOppositeColors(this.row - 2, this.col + 1)) {
        this.moves.push([this.row - 2, this.col + 1]);
      }
    } else {
      this.moves.push([this.row - 2, this.col + 1]);
    }
  }

  /* up and left */
  if (board.isValidPosition(this.row - 2, this.col - 1)) {
    if (board.isOccupiedPosition(this.row - 2, this.col - 1)) {
      if (utils.areOppositeColors(this.row - 2, this.col - 1)) {
        this.moves.push([this.row - 2, this.col - 1]);
      }
    } else {
      this.moves.push([this.row - 2, this.col - 1]);
    }
  }

  /* right and down */
  if (board.isValidPosition(this.row + 1, this.col + 2)) {
    if (board.isOccupiedPosition(this.row + 1, this.col + 2)) {
      if (utils.areOppositeColors(this.row + 1, this.col + 2)) {
        this.moves.push([this.row + 1, this.col + 2]);
      }
    } else {
      this.moves.push([this.row + 1, this.col + 2]);
    }
  }

  /* left and down */
  if (board.isValidPosition(this.row + 1, this.col - 2)) {
    if (board.isOccupiedPosition(this.row + 1, this.col - 2)) {
      if (utils.areOppositeColors(this.row + 1, this.col - 2)) {
        this.moves.push([this.row + 1, this.col - 2]);
      }
    } else {
      this.moves.push([this.row + 1, this.col - 2]);
    }
  }

  /* right and up */
  if (board.isValidPosition(this.row - 1, this.col + 2)) {
    if (board.isOccupiedPosition(this.row - 1, this.col + 2)) {
      if (utils.areOppositeColors(this.row - 1, this.col + 2)) {
        this.moves.push([this.row - 1, this.col + 2]);
      }
    } else {
      this.moves.push([this.row - 1, this.col + 2]);
    }
  }

  /* left and up */
  if (board.isValidPosition(this.row - 1, this.col - 2)) {
    if (board.isOccupiedPosition(this.row - 1, this.col - 2)) {
      if (utils.areOppositeColors(this.row - 1, this.col - 2)) {
        this.moves.push([this.row - 1, this.col - 2]);
      }
    } else {
      this.moves.push([this.row - 1, this.col - 2]);
    }
  }
};

module.exports = Knight;
