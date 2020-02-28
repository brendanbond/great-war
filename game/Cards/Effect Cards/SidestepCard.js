const utils = require('../../utils');

function SidestepCard() {
  
}

SidestepCard.prototype.shift = (CurrRow, CurrCol, NewRow, NewCol, player) => {
  if (board.isValidPosition(CurrRow, CurrCol) && board.isOccupiedPosition(CurrRow, CurrCol)) {
    let target = board.positionAt(CurrRow, CurrCol);
    /* TODO: Potentially clean up this code somehow later */
    if (!utils.areOppositeColors(player, target)) {
      /* TODO: Implement a check for if the movement would place the king in Check */
      if (board.isValidPosition(NewRow, NewCol) && !board.isOccupiedPosition(NewRow, NewCol)) {
        if (Math.abs(CurrCol - NewCol) === 1) {
          //ensure that the selected space is one space to the left or right
          board.setPosition(NewCol, NewCol, target);
          board.clearPosition(CurrRow, CurrCol);
        }
      }
    }//end new location valid check
  }
};
