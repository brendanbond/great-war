const Piece = require("./Piece");

function Pawn(color) {
  Piece.call(this, "P", color);
  this.symbol = this.color == "white" ? "\u2659" : "\u265f";
  this.opening = true;
  this.attacks = []; // Attacks differ from moves.
}

Pawn.prototype = Object.create(Piece.prototype);

Object.defineProperty(Pawn.prototype, "constructor", {
  value: Pawn,
  enumerable: false,
  writable: true
});

Pawn.prototype.updateMoves = function(board, row, col) {
  this.moves = [];

  if (this.color === "white") {
    this.moves.push([row - 1, col]);
    if (this.opening) {
      this.moves.push([row - 2, col]);
    }
    this.attacks.push([row - 1, col + 1], [row - 1, col - 1]);
  } else {
    this.moves.push([row + 1, col]);
    if (this.opening) {
      this.moves.push([row + 2, col]);
    }
    this.attacks.push([row + 1, col + 1], [row + 1, col - 1]);
  }

  this.moves = this.moves.filter(move => {
    return (
      board.isValidPosition(move[0], move[1]) &&
      board.isEmptyPosition(move[0], move[1])
    );
  });
};

Pawn.prototype.move = function() {
  this.opening = false;
};

module.exports = Pawn;
