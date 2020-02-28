const utils = require('../../utils');

function RoyalArmorCard() {
  
}

RoyalArmorCard.prototype.enhance = (row, col, player) => {
  if (board.isValidPosition(row, col) && board.isOccupiedPosition(row, col)) {
    let target = board.positionAt(row, col);
    
    if (!utils.areOppositeColors(player, target) && utils.isRoyalty(target)) {
      /* TODO: Check if the piece is royalty */
      for (let r = row - 1; r < row + 1; r++) {
        /* TODO: Potentially make a while/do-while loop to increase efficiency */
        for (let c = col - 1; c < col + 1; c++) {
          if (board.isValidPosition(r, c) && board.isOccupiedPosition(r, c)) {
            //There is a piece in the current location
            let piece = board.positionAt(r, c);
            if (!utils.areOppositeColors(player, piece) && utils.isRoyalty(piece)) {
              /* TODO: Implement the movement manipulation for the selected piece */
              break;
            }
          }
        }//end col for
      }//end row for
    }//end royalty check
  }//end occupied check
};
