/*
* ****************************************************************************************
*                                            Prince
* ****************************************************************************************
* 
* This piece will be moving in a manner similar to kings. The difference is that it has the
* option to move up to two (2) spaces forward in the diagonal direction
* 
* Movement and Capturing for this piece is:
*       Up tp two (2) spaces in forward diagonal
*       One (1) space in any other direction
* */
/* TODO: Ensure that movement checks are correct */
const utils = require('./utils');

function Prince(color) {
  /* TODO: Create a unique ID that will not interfere with other pieces */
  this.id = 'P';
  this.color = color;
}

Prince.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  
  //check the upward left diagonal
  for(let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col - i)) {
      if (board.isOccupiedPosition(row - i, col - i)) {
        let target = board.positionAt(row - i, col - i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col - i]);
        }
        break;
      } else {
        actions.moves.push([row - i, col - i]);
      }
    }
  }//end up left loop
  
  //check up right diagonal
  for (let i = 1; i <= 2; i++) {
    if (board.isValidPosition(row - i, col + i)) {
      if (board.isOccupiedPosition(row - i, col + i)) {
        let target = board.positionAt(row - i, col + i);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row - i, col + i]);
        }
        
        break;
      } else {
        actions.moves.push([row - i, col + i]);
      }
    }
  }//end up right check
  
  //up 1 space check
  if (board.isValidPosition(row - 1, col)) {
    if (board.isOccupiedPosition(row - 1, col)) {
      let target = board.positionAt(row - 1, col);
      
      if (utils.areOppositeColors(this, target)) {
        actions.moves.push([row - 1, col]);
      }
    } else {
      actions.moves.push([row - 1, col]);
    }
  }
  
  //check left and right spaces
  for (let c = col - 1; c <= col + 1; c += 2) {
    if(board.isValidPosition(row, c)) {
      if(board.isOccupiedPosition(row, c)) {
        let target = board.positionAt(row, c);
        
        if (utils.areOppositeColors(this, target)) {
          actions.move.push([row, c]);
        }
      } else {
        actions.moves.push([row, c]);
      }
    }
  }
  
  //check back spaces
  for (let c = col - 1; c <= col + 1; c++) {
    if(board.isValidPosition(row + 1, c)) {
      if(board.isOccupiedPosition(row + 1, c)) {
        let target = board.positionAt(row + 1, c);
        
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row + 1, c]);
        }
      } else {
        actions.moves.push([row + 1, c]);
      }
    }
  }
};

module.exports = Prince;
