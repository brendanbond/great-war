function King(color) {
  this.id = "K";
  this.color = color;
  this.symbol = this.color == "white" ? "\u2654" : "\u265a";
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
      board.isValidPosition(move[0], move[1]) &&
      board.isEmptyPosition(move[0], move[1])
    );
  });

  this.actions = actions;
};

module.exports = King;
