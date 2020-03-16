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

Queen.prototype.updateMoves = function(board) {
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

module.exports = Queen;
