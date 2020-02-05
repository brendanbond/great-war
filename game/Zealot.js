/*
* ****************************************************************************************
*                                            Zealot
* ****************************************************************************************
* 
* This piece will be moving manner that is primarily forward but has some minor retreat
* abilities
* 
* Movement and Capturing for this piece is:
*       Up two (2) spaces in backward diagonal
*       Exactly one (1) space to the left, right, or forward diagonals
*       Up to three (3) spaces directly forward
* */

const utils = require('./utils');

function Zealot(color) {
  this.id = 'Z';
  this.color = color;
}

Zealot.prototype.getActions = function (board, row, col) {
  let actions = {
    moves: []
  };
  
  //check forward movement
  for (let r = row - 1; r <= row - 3; r--) {
    if (board.isValidPosition(r, col)) {
      if (board.isOccupiedPosition(r, col)) {
        let target = board.positionAt(r, col);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([r, col]);
        }
        
        break;
      } else {
        actions.moves.push([r, col]);
      }//end enemy check
    }//end occupied check
  }//end row manipulation
  
  //check back left diagonal
  for (let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row + i, col - i)) {
      if (board.isOccupiedPosition(row + i, col - i)) {
        let target = board.positionAt(row + i, col - i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col - i]);
        }
        
        break;
      } else {
        actions.moves.push([row + i, col - i]);
      }
    }
  }//end diagonal manipulation
  
  //down right diagonal
  for (let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row + i, col + i)) {
      if (board.isOccupiedPosition(row + i, col + i)) {
        let target = board.positionAt(row + i, col + i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col + i]);
        }
      }
    }
  }//end diagonal manipulation
  
  //check the sides and forward diagonals
  for (let r = row - 1; r <= row; r++) {
    for (let c = col - 1; c < col + 1; c += 2) {
      if (board.isValidPosition(r, c)) {
        if(board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }
      }
    }
  }//end side and front corners
};
