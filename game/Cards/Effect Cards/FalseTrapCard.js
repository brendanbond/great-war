function FalseTrapCard() {}

FalseTrapCard.prototype.set = (board, row, col) => {
  if (board.isValidPosition(row, col) && !board.isOccupiedPosition(row, col)) {
    board.setPosition(row, col, new Trap(row, col, false));
  }
};
