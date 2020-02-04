/*
* ****************************************************************************************
*                                            Ox
* ****************************************************************************************
* 
* This piece will be able to move in a fairly unique way compared to the rest of the
* pieces
* 
* Movement and Capturing for this piece is:
*       exactly one (1) space diagonally in any direction
*       exactly one (1) space to the left and the right
*       forward and backward movement is prohibited for this piece
* */

const utils = require('./utils');

function Ox(color) {
  this.id = 'O';
  this.color = color;
}

ox.prototype.getActions = function (board, row, col) {
  let actions = {
    moves: []
  };

  //check diagonal movements
  for (let r = row - 1; r <= row + 1; r += 2) {
    for (let c = col - 1; c <= col + 1; c += 2) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);

          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }//end vacancy check
      }//end valid space on board check
    }//end column manipulation loop
  }//end row manipulation loop

  //check left and right spaces
  for(let c = col - 1; c < col + 1; c += 2) {
    if(board.isValidPosition(row, c)) {
      if(board.isOccupiedPosition(row, c)) {
        let target = board.positionAt(row, c);

        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row, c]);
        }
      } else {
        actions.moves.push([row, c]);
      }//end vacancy check
    }//end valid space check
  }//end column manipulation loop
};

module.exports = Ox;
