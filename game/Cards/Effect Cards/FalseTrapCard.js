function FalseTrapCard() {}

FalseTrapCard.prototype.set = (row, col) => {
  if (board.isValidPosition(row, col) && !board.isOccupiedPosition(row, col)) {
    board.setPosition(row, col, new Trap(row, col, false));
  }
};
