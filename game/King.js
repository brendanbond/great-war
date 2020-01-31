function King(color) {
  this.id = "K";
  this.color = color;
}

King.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };

  actions.moves.push([row - 1, col - 1]);
  actions.moves.push([row - 1, col]);
  actions.moves.push([row - 1, col + 1]);
  actions.moves.push([row, col - 1]);
  actions.moves.push([row, col + 1]);
  actions.moves.push([row + 1, col - 1]);
  actions.moves.push([row + 1, col]);
  actions.moves.push([row + 1, col + 1]);

  actions.moves = actions.moves.filter(move => {
    return (
      move[0] >= 0 && // row doesn't fall off the board top
      move[0] < board.length && // row doesn't fall off of the board bottom
      move[1] >= 0 && // col doesn't fall off of the board left
      move[1] < board[row].length && // col doesn't fall off of the board right
      board[move[0]][move[1]] === -1
    );
  });

  this.actions = actions;
};

module.exports = King;
