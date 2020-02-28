function UndoCard() {}

UndoCard.prototype.undo = (board, row, col) => {
  if (board.isValidPosition(row, col) && board.isOccupiedPosition(row, col)) {
    /* TODO: Implement the undo of the movement and captures 1 turn prior */
    /* TODO: Implement a halt like effect on the selected piece to keep from moving for a turn */
    /* TODO: Is the pawn sacrifice handled here or elsewhere? */
  }
};
