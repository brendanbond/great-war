const arraysAreEqual = require("./utils");

function Pawn(color) {
  const id = "P";
  const opening = true;

  const getActions = (board, row, col) => {
    let actions = {
      moves: [],
      attacks: []
    };

    if (color === "white") {
      actions.moves.push([row - 1, col + 0]);
      if (opening) {
        actions.moves.push([row - 2, col + 0]);
      }
      actions.attacks.push([row - 1, col + 1], [row - 1, col - 1]);
    } else {
      actions.moves.push([row + 1, col + 0]);
      if (opening) {
        actions.moves.push([row + 2, col + 0]);
      }
      actions.attacks.push([row + 1, col + 1], [row + 1, col - 1]);
    }
    actions.moves.filter(move => {
      if (
        board[row + move[0]][col + move[1]] === -1 && // the destination square is unoccupied
        row + move[0] >= 0 && // row doesn't fall off the board top
        row + move[0] < board.length && // row doesn't fall off of the board bottom
        col + move[1] >= 0 && // col doesn't fall off of the board left
        col + move[1] < board[row].length // col doesn't fall off of the board right
      ) {
        return true;
      }
    });

    actions.attacks.filter(attack => {
      if (
        board[row + attack[0]][col + attack[1]] !== -1 && // the destination square is occupied
        row + attack[0] >= 0 && // row doesn't fall off the board top
        row + attack[0] < board.length && // row doesn't fall off of the board bottom
        col + attack[1] >= 0 && // col doesn't fall off of the board left
        col + attack[1] < board[row].length // col doesn't fall off of the board right
      ) {
        return true;
      }
    });

    return actions;
  };

  const move = () => {
    opening = false;
  };

  return {
    id: id,
    color: color,
    opening: opening,
    getActions: getActions,
    move: move
  };
}

module.exports = Pawn;
