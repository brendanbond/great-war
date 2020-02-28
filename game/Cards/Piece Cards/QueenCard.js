function QueenCard() {

}

QueenCard.prototype.placeQueen = (board, row, col, color) => {
  if (board.isValidPosition(row, col)) {
    if (!board.isOccupiedPosition(row, col)) {
      board.setPosition(row, col, new Queen(color));
    }
  }
};
