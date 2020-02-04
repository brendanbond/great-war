/*
* ****************************************************************************************
*                                            Princess
* ****************************************************************************************
* 
* This piece will be moving in a manner similar to the Queen, however it will have a 2
* space limit
* 
* Movement and Capturing for this piece is:
*       Up to two (2) spaces in any diagonal
*       Up to two (2) spaces in any lateral (left, right, up, down)
* */

const utils = require('./utils');

function Princess(color) {
  /* TODO: Figure out what the ID should be to not conflict with other pieces */
  this.id = 'P';
  this.color = color;
}

Princess.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  
  //check up left diagonal
  for(let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col - i)) {
      if(board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col - i]);
        }
        //piece blocking the other move possiblities
        break;
      } else {
        actions.move.push([row - i, col - i]);
      }//end vacancy checks
    }//end valid position check
  }//end up left diagonal

  //check upward right diagonal
  for(let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col + i)) {
      if(board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);

        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col + i]);
        }
        //piece blocking the other move possiblities
        break;
      } else {
        actions.move.push([row - i, col + i]);
      }//end vacancy checks
    }//end valid position check
  }//end up right diagonal
  
  //check downward right diagonal
  for(let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row + i, col + i)) {
      if(board.isOccupiedPosition(row + i, col + i)) {
        let target = board.positionAt(row + i, col + i);

        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col + i]);
        }
        //piece blocking the other move possiblities
        break;
      } else {
        actions.move.push([row + i, col + i]);
      }//end vacancy checks
    }//end valid position check
  }//end down right diagonal
  
  //check downward left diagonal
  for(let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row + i, col - i)) {
      if(board.isOccupiedPosition(row + i, col - i)) {
        let target = board.positionAt(row + i, col - i);

        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + i, col - i]);
        }
        //piece blocking the other move possiblities
        break;
      } else {
        actions.move.push([row + i, col - i]);
      }//end vacancy checks
    }//end valid position check
  }//end down left diagonal
};

module.exports = Princess;
