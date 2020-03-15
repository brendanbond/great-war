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

Piece.prototype.isWhite = function() {
  return this.color === "white";
};

Piece.prototype.isBlack = function() {
  return this.color === "black";
};

Piece.prototype.isOppositeColor = function(piece) {
  return this.color !== piece.color;
};

module.exports = Piece;
