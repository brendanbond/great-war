function Player(color) {
  this.color = color;
  this.pieces = [];
  this.cards = [];
  this.captures = [];
  this.inCheck = false;
}

Player.prototype.forEachPiece = function(process) {
  for (let i = 0; i < this.pieces.length; ++i) {
    if (!this.pieces[i].killed) {
      process(this.pieces[i]);
    }
  }
};

Player.prototype.clearMoves = function() {
  this.forEachPiece(piece => {
    piece.clearMoves();
  });
};

Player.prototype.findKing = function() {
  for (let i = 0; i < this.pieces.length; ++i) {
    if (this.pieces[i].id === "K") {
      return this.pieces[i];
    }
  }
  return null;
};

Player.prototype.addPiece = function(piece) {
  this.pieces.push(piece);
};

Player.prototype.addCapture = function(piece) {
  this.captures.push(piece);
};

Player.prototype.isWhite = function() {
  return this.color === "white";
};

module.exports = Player;
