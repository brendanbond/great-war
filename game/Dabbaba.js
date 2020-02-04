/*
* ****************************************************************************************
*                                        Dabbaba
* ****************************************************************************************
* 
* This piece will be able to move in a unique manner that involves moving either to the left
* right, forward or backward to move and capture enemy pieces.
* 
* Movement and Capturing for this piece is:
*       exactly two (2) spaces orthogonally (either forward, backward, left or right)
* */

const utils = require('./utils');

function Dabbaba(color) {
  this.id = 'D';
  this.color = color;
}

Dabbaba.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  
  /* TODO: Ensure that the loop logics are all correct */
  //Check forward and backward orthogonals
  for (let r = row - 2; r <= row + 2; r += 4) {
    if (board.isValidPosition(r, col)) {
      if (board.isOccupiedPosition(r, col)) {
        let target = board.positionAt(r, col);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([r, col]);
        }
      } else {
        actions.moves.push([r, col]);
      }//end target check
    }//end valid space check
  }//end row manipulation loop
  
  //check the left and right orthogonals
  for (let c = col - 2; c <= col + 2; c += 4) {
    if (board.isValidPosition(row, c)) {
      if (board.isOccupiedPosition(row, c)) {
        let target = board.positionAt(row, c);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row, c]);
        }
      } else {
        actions.moves.push([row, c]);
      }//end enemy check
    }//end valid space check
  }//end column manipulation loop
};

module.exports = Dabbaba;
