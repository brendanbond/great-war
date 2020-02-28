const utils = require('../../utils.js');

function HaltCard() {

}

HaltCard.prototype.haltPiece = (board, row, col, color) => {
  if (board.isValidPosition(row, col)) {
    if (board.isOccupiedPosition(row, col)) {
      let target = board.positionAt(row, col);
      
      if (utils.areOppositeColors(color, target)) {
        /* TODO: How to make the piece not able to move? */
      }
    }
  }
};
