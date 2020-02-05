/*
* ****************************************************************************************
*                                       Manticore
* ****************************************************************************************
* 
* This piece will be more of a strategic piece like a knight. It can access most if not
* all spaces on the board, however, needs to be placed and positioned to be used to it's
* full potential. Has a movement pattern like a pure mixture between a Dabbaba and a Knight 
* 
* Movement and Capturing for this piece is:
*       Exactly two/1 (2/1) in any direction (like a Knight)
*       Exactly two (2) spaces in any direction (like a Dabbaba)
* */

const utils = require('./utils');

function Manticore(color) {
  this.id = 'M';
  this.color = color;
}

Manticore.prototype.getActions = function (board, row, col) {
  let actions = {
    moves: []
  };
  
  //check forward and backward 3 spaces
  for (let c = col - 1; c <= col + 1; c++) {
    for (let r = row - 2; r <= row + 2; r += 4) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);

          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }
      }
    }
  }//end col manipulation
  
  //check left and right 6 spaces
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 2; c <= col + 2; c += 4) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        } 
      }
    }//end column manipulation
  }//end row manipulation
};

module.exports = Manticore;
