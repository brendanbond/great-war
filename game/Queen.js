const utils = require("./utils");
const Piece = require("./Piece");

function Queen(color) {
  Piece.call(this, "Q", color);
  this.symbol = this.color == "white" ? "\u2655" : "\u265b";
}

Queen.prototype = Object.create(Piece.prototype);

Object.defineProperty(Queen.prototype, "constructor", {
  value: Queen,
  enumerable: false,
  writable: true
});

Queen.prototype.updateMoves = function(board, row, col) {
  this.moves = [];

  /* down */
  for (let i = 1; i < board.nRows(); ++i) {
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
  for (let i = 1; i < board.nRows(); ++i) {
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
  for (let i = 1; i < board.nCols(); ++i) {
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
  for (let i = 1; i < board.nCols(); ++i) {
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

  /* down and right diagonal */
  for (let i = 1; i < board.nRows(); ++i) {
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
  for (let i = 1; i < board.nRows(); ++i) {
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
  for (let i = 1; i < board.nRows(); ++i) {
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
  for (let i = 1; i < board.nRows(); ++i) {
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

module.exports = Queen;
