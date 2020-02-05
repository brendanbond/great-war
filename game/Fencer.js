/*
* ****************************************************************************************
*                                        Fencer
* ****************************************************************************************
* 
* This piece will mainly be an offensive that will mostly charge into enemy territory,
* however, it can slightly retreat when needed but can't go far 
* 
* Movement and Capturing for this piece is:
*       Up tp three (3) spaces forward
*       Exactly one (1) space backward
*       Up to two (2) spaces in either forward diagonal
*       Exactly one (1) space to the left or right
* */

const utils = require('./utils');

function Fencer(color) {
  this.id = 'F';
  this.color = color;
}

Fencer.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  
  //check the forward movement
  for (let r = row - 1; r <= row + 3; r++) {
    if (board.isValidPosition(r, col)) {
      if (board.isOccupiedPosition(r, col)) {
        let target = board.positionAt(r, col);
        
        if(utils.areOppositeColors(this, target)) {
          actions.moves.push([r, col]);
        }
        
        break;
      }
      
      actions.moves.push([r, col]);
    }
  }//end row manipulation
  
  //check forward left diagonal
  for (let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col - i)) {
      if(board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col - i]);
        }
        
        break;
      }
      
      actions.moves.push([row - i, col - i]);
    }
  }//end forward left diagonal
  
  //check forward right diagonal
  for (let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col + i)) {
      if(board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);

        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col + i]);
        }

        break;
      }

      actions.moves.push([row - i, col + i]);
    }
  }//end forward right diagonal
  
  //check backward
  if (board.isValidPosition(row + 1, col)) {
    if (board.isOccupiedPosition(row + 1, col)) {
      let target = board.positionAt(row + 1, col);
      
      if (utils.areOppositeColors(this, target)) {
        actions.moves.push([row + 1, col]);
      }
    } else {
      actions.moves.push([row + 1, col]);
    }
  }//end backward check
  
  //check left and right
  for (let c = col - 1; c <= col + 1; c += 2) {
    if (board.isValidPosition(row, c)) {
      if (board.isOccupiedPosition(row, c)) {
        let target = board.positionAt(row, c);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row, c]);
        }
      } else {
        actions.moves.push([row, c]);
      }
    }
  }//end left and right check
};

module.exports = Fencer;
