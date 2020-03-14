const Piece = require("./Piece");

function King(color) {
  Piece.call(this, "K", color);
  this.symbol = this.color == "white" ? "\u2654" : "\u265a";
}

King.prototype = Object.create(Piece.prototype);

Object.defineProperty(King.prototype, "constructor", {
  value: King,
  enumerable: false,
  writable: true
});

King.prototype.getActions = function() {
  return [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
  ];
};

module.exports = King;
