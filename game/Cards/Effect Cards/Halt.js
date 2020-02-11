const utils = require('../../utils');
﻿
function Halt() {
  EffectCard.call(this, 1.5, false);
}

Halt.prototype.executeHalt = (board, row, col, player) => {
  if (board.isValidPosition(row, col)) {
    if (board.isOccupiedPosition(row, col)) {
      let target = board.positionAt(row, col);
      
      /* TODO: Determine what pieces are heavy pieces other than king */
      if (target.id === 'K') {
        /* TODO: Implement the halt function */
      }
    }
  }
};

Halt.prototype = Object.create(EffectCard.prototype);

Object.defineProperty(Halt.prototype, 'constructor', {
  value: Halt,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
