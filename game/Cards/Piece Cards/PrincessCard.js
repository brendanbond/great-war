function PrincessCard() {

}

PrincessCard.prototype.placePrincess = (board, row, col, color) => {
  if (board.isValidPosition(row, col)) {
    if (!board.isOccupiedPosition(row, col)) {
      board.setPosition(row, col, new Princess(color));
    }
  }
};
