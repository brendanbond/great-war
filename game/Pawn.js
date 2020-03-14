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

Pawn.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: [],
    attacks: []
  };

  if (this.color === "white") {
    actions.moves.push([row - 1, col + 0]);
    if (this.opening) {
      actions.moves.push([row - 2, col + 0]);
    }
    actions.attacks.push([row - 1, col + 1], [row - 1, col - 1]);
  } else {
    actions.moves.push([row + 1, col + 0]);
    if (this.opening) {
      actions.moves.push([row + 2, col + 0]);
    }
    actions.attacks.push([row + 1, col + 1], [row + 1, col - 1]);
  }

  actions.moves = actions.moves.filter(move => {
    return (
      board.isValidPosition(move[0], move[1]) &&
      board.isEmptyPosition(move[0], move[1])
    );
  });

  actions.attacks = actions.attacks.filter(attack => {
    return (
      board.isValidPosition(attack[0], attack[1]) &&
      board.isOccupiedPosition(attack[0], attack[1])
    );
  });

  this.actions = actions;
};

Pawn.prototype.move = function() {
  this.opening = false;
};

module.exports = Pawn;
