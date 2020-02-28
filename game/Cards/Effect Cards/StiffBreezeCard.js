const utils = require('../../utils');

function StiffBreezeCard() {
  
}

StiffBreezeCard.prototype.BlowAway = (board, CurrRow, CurrCol, NewRow, NewCol) => {
  if (board.isValidPosition(CurrRow, CurrCol) && board.isOccupiedPosition(CurrRow, CurrCol)) {
    if (board.isValidPosition(NewRow, NewCol) && !board.isOccupiedPosition(NewRow, NewCol)) {
      if (Math.abs(CurrRow - NewRow) === 1 && Math.abs(CurrCol - NewCol) === 1) {
        //ensure space is 1 space orthogonally to the current position
        /* TODO: is this in any direction that the player chooses or is it limited based on player? */
        board.setPosition(NewRow, NewCol, board.positionAt(CurrRow, CurrCol));
        board.clearPosition(CurrRow, CurrCol);
      }
    }
  }
};
