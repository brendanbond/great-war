function Piece(id, color) {
  this.id = id;
  this.color = color;
  this.symbol = null;
  this.actions = {
    moves: [],
    attacks: []
  };
}

Piece.prototype.getActions = function() {
  throw "getActions has not been implemented on " + this.constructor + "!!";
};

Piece.prototype.isOppositeColor = function(piece) {
  return this.color === "white"
    ? piece.color === "black"
    : piece.color === "white";
};

Piece.prototype.clearActions = function() {
  this.actions = {
    moves: [],
    attacks: []
  };
};

module.exports = Piece;
