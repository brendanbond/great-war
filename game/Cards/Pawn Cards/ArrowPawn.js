const utils = require('../../utils');
﻿
function ArrowPawn() {
  PawnCard.call(this, 1.5);
}

ArrowPawn.prototype.promote = (board, row, col) => {
  if (board.isValidPosition(row, col)) {
    if (board.isOccupiedPosition(row, col)) {
      let target = board.positionAt(row, col);
      
      if (!utils.areOppositeColors(player, target)) {
        //promote the selected pawn
        /* TODO: Verify the promotion */
        
      }
    }
  }
};

ArrowPawn.prototype = Object.create(PawnCard.prototype);

Object.defineProperty(ArrowPawn.prototype, 'constructor', {
  value: ArrowPawn,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
