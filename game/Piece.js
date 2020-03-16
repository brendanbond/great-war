function Piece(id, color) {
  this.id = id;
  this.color = color;
  this.symbol = null;
  this.killed = false;
  this.moves = [];
}

Piece.prototype.getMoves = function() {
  throw "getActions has not been implemented for " +
    this.constructor.name +
    "!!";
};

Piece.prototype.clearMoves = function() {
  this.moves = [];
  if (this.attacks) {
    this.attacks = [];
  }
};

Piece.prototype.hasKingInCheck = function(board, row, col) {
  return this.moves.some(move => {
    if (board.isOccupiedPosition(row, col)) {
      let target = board.positionAt(row, col);
      if (target.isKing() && this.isOppositeColor(target)) {
        return true;
      }
    }
  });
};

Piece.prototype.isWhite = function() {
  return this.color === "white";
};

Piece.prototype.isBlack = function() {
  return this.color === "black";
};

Piece.prototype.isKing = function() {
  return this.id === "K";
};

Piece.prototype.isOppositeColor = function(piece) {
  return this.color !== piece.color;
};

module.exports = Piece;
