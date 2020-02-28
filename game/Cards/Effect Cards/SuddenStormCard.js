function SuddenStormCard() {
  
}

SuddenStormCard.prototype.createStorm = (board, row, col) => {
  if (board.isValidPosition(row, col) && !board.isOccupiedPosition(row, col)) {
    //make sure the space is valid and empty
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (!board.isOccupiedPosition(r, c)) {
          //make the empty spaces be a storm "piece" to keep pieces from moving to it
          board.setPosition(r, c, new Storm(row, col))
        } else {
          /* TODO: Implement a halt like effect on the pieces in the storm */
        }
      }//end col loop
    }//end row loop
  }
};
