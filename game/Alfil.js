/*
* ****************************************************************************************
*                                            Alfil
* ****************************************************************************************
* 
* This piece will be moving in a manner similar to bishops, in that they move diagonally,
* however, they have to move an exact number instead of any number available
* 
* Movement and Capturing for this piece is:
*       exactly two (2) spaces in any diagonal
* */

const utils = require('./utils');

function Alfil(color) {
  this.id = 'A';
  this.color = color;
}

Alfil.prototype.getActions = function (board, row, col) {
  let actions = {
    moves: []
  };

  //check the diagonals
  for (let r = row - 2; r <= row + 2; r += 4) {
    for (let c = col - 2; c <= col + 2; c += 4) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }//end vacancy check
      }//end valid space check
    }//end column manipulation loop
  }//end row manipulation loop
};

module.exports = Alfil;
