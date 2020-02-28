function SimplePawnCard() {

}

SimplePawnCard.prototype.placeSimplePawn = (board, row, col, color) => {
  if (board.isValidPosition(row, col)) {
    if (!board.isOccupiedPosition(row, col)) {
      board.setPosition(row, col, new Pawn(color));
    }
  }
};
