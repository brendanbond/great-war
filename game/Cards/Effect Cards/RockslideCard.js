const utils = require('../../utils');

function RockslideCard() {
  
}

RockslideCard.prototype.rockslide = (row, col, player) => {
  if (board.isValidPosition(row, col)) {
    if (board.isOccupiedPosition(row, col)) {
      let target = board.positionAt(row, col);
      
      if (utils.areOppositeColors(player, target)) {
        if (utils.isMassive(target)) {
          /* TODO: Somehow check if piece is massive piece */
          board.clearPosition(row, col);
          /* TODO: implement capture methods */
        } else {
          /* TODO: Implement halt like effect to piece */
        }
      }
    }
  }
};
