function Piece(id, color) {
  this.id = id;
  this.color = color;
  this.row = null;
  this.col = null;
  this.symbol = null;
  this.killed = false;
  this.moves = [];
}

Piece.prototype.setPosition = function(row, col) {
  this.row = row;
  this.col = col;
};

Piece.prototype.kill = function() {
  this.row = null;
  this.col = null;
  this.killed = true;
};

Piece.prototype.updateMoves = function() {
  throw "updateMoves has not been implemented for " +
    this.constructor.name +
    "!!";
};

Piece.prototype.clearMoves = function() {
  this.moves = [];
  if (this.attacks) {
    this.attacks = [];
  }
};

Piece.prototype.hasKingInCheck = function(board) {
  return this.moves.some(move => {
    if (board.isOccupiedPosition(move[0], move[1])) {
      let target = board.positionAt(move[0], move[1]);
      if (target.isKing() && this.isOppositeColor(target)) {
        return true;
      }
    }
    return false;
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
