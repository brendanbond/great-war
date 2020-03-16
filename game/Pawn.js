const Piece = require("./Piece");

function Pawn(color) {
  Piece.call(this, "P", color);
  this.symbol = this.color == "white" ? "\u2659" : "\u265f";
  this.opening = true;
  this.attacks = [];
}

Pawn.prototype = Object.create(Piece.prototype);

Object.defineProperty(Pawn.prototype, "constructor", {
  value: Pawn,
  enumerable: false,
  writable: true
});

Pawn.prototype.updateMoves = function(board, row, col) {
  // White moves up, black moves down.
  let k = this.isWhite() ? -1 : 1;

  // Add attacks.
  if (board.isValidPosition(row + k, col + 1)) {
    this.attacks.push([row + k, col + 1]);
  }
  if (board.isValidPosition(row + k, col - 1)) {
    this.attacks.push([row + k, col - 1]);
  }

  // Add moves.
  if (board.isEmptyPosition(row + k, col)) {
    this.moves.push([row + k, col]);
    if (this.opening && board.isEmptyPosition(row + 2 * k, col)) {
      this.moves.push([row + 2 * k, col]);
    }

    // If attacks have a valid target, add them to moves.
    for (let i = 0; i < this.attacks.length; ++i) {
      let attack = this.attacks[i];
      if (board.isOccupiedPosition(attack[0], attack[1])) {
        let target = board.positionAt(attack[0], attack[1]);
        if (this.isOppositeColor(target)) {
          this.moves.push(attack);
        }
      }
    }
  }
};

Pawn.prototype.move = function() {
  this.opening = false;
};

module.exports = Pawn;
