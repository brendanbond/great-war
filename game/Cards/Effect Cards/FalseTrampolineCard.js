﻿function FalseTrampolineCard() {

}

FalseTrampolineCard.prototype.place = (row, col) => {
  if (board.isValidPosition(row, col) && !board.isOccupiedPosition(row, col)) {
    board.setPosition(row, col, new Tramopline(row, col, false));
  }
};
