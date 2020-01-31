const arraysAreEqual = require("./utils");

function Pawn(color) {
  this.id = "P";
  this.opening = true;
}

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
      board[move[0]][move[1]] === -1 && // the destination square is unoccupied
      move[0] >= 0 && // row doesn't fall off the board top
      move[0] < board.length && // row doesn't fall off of the board bottom
      move[1] >= 0 && // col doesn't fall off of the board left
      move[1] < board[row].length // col doesn't fall off of the board right
    );
  });

  actions.attacks = actions.attacks.filter(attack => {
    return (
      board[attack[0]][attack[1]] !== -1 && // the destination square is occupied
      attack[0] >= 0 && // row doesn't fall off the board top
      attack[0] < board.length && // row doesn't fall off of the board bottom
      attack[1] >= 0 && // col doesn't fall off of the board left
      attack[1] < board[row].length // col doesn't fall off of the board right
    );
  });

  this.actions = actions;
};

Pawn.prototype.move = function() {
  this.opening = false;
};

module.exports = Pawn;
