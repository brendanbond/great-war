const Piece = require("./Piece");

function Pawn(color) {
  Piece.call(this, "P", color);
  this.symbol = this.color == "white" ? "\u2659" : "\u265f";
  this.opening = true;
}

Pawn.prototype = Object.create(Piece.prototype);

Object.defineProperty(Pawn.prototype, "constructor", {
  value: Pawn,
  enumerable: false,
  writable: true
});

Pawn.prototype.updateMoves = function(board, row, col) {
  // Reset moves so that we're not just pushing more moves onto the array.
  this.moves = [];

  // White moves up, black moves down.
  let k = this.isWhite() ? -1 : 1;

  // Add moves.
  if (board.isEmptyPosition(row + k, col)) {
    this.moves.push([row + k, col]);
    if (this.opening && board.isEmptyPosition(row + 2 * k, col)) {
      this.moves.push([row + 2 * k, col]);
    }
  }

  // Add attacks.
  if (board.isOccupiedPosition(row + k, col + 1)) {
    this.moves.push([row + k, col + 1]);
  }
  if (board.isOccupiedPosition(row + k, col - 1)) {
    this.moves.push([row + k, col - 1]);
  }
};

Pawn.prototype.move = function() {
  this.opening = false;
};

module.exports = Pawn;
