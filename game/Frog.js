/*
* ****************************************************************************************
*                                         Frog
* ****************************************************************************************
* 
* This piece will have similar abilities as the knight, meaning that it can "hop"
* over pieces to get to it's valid spaces. As long as the resulting space is not occupied
* by a friendly piece, the space is valid for movement.
* 
* Movement and Capturing for this piece is:
*       exactly three (3) spaces either to the left or right
*       exactly one (1) space in either diagonal
*       exactly two (2) spaces either forward or backward
* */

const utils = require('./utils');

function Frog(color) {
  this.id = 'F';
  this.color = color;
}

Frog.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  /* TODO: Check to make sure the logic of the for loops are correct.
      Better logic code commented out below each loop if wrong*/
  
  //left and right checks
  for (let c = col - 3; c <= col + 3; c += 6) {
    if (board.isValidPosition(row, c)) {
      //space is on the board
      if (board.isOccupiedPosition(row, c)) {
        //the space is occupied by a piece
        let target = board.positionAt(row, c);
        if (utils.areOppositeColors(this, target)) {
          //the piece is an enemy
          actions.moves.push([row, c]);
        }
      } else {
        //unoccupied valid space on the board
        actions.moves.push([row, c])
      }//end occupied position check
    }//end valid position check
  }//end column for loop
  /*
  //left movement
  if (board.isValidPosition(row, col - 3)) {
    //space is on the board
    if (board.isOccupiedPosition(row, col - 3)) {
      //the space is occupied by a piece
      let target = board.positionAt(row, col - 3);
      if (utils.areOppositeColors(this, target)) {
        //the piece is an enemy
        actions.moves.push([row, col - 3]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row, col - 3])
    }
  }
  
  //right movement
  if (board.isValidPosition(row, col + 3)) {
    //space is on the board
    if (board.isOccupiedPosition(row, col + 3)) {
      //the space is occupied by a piece
      let target = board.positionAt(row, col + 3);
      if (utils.areOppositeColors(this, target)) {
        //the piece is an enemy
        actions.moves.push([row, col + 3]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row, col + 3])
    }
  }
  */
  
  //forward and backward checks
  for (let r = row - 2; r <= row + 2; r += 4) {
    if (board.isValidPosition(r, col)) {
      //space is on the board
      if (board.isOccupiedPosition(r, col)) {
        //the space is occupied by a piece
        let target = board.positionAt(r, col);
        if (utils.areOppositeColors(this, target)) {
          //the piece is an enemy
          actions.moves.push([r, col]);
        }
      } else {
        //unoccupied valid space on the board
        actions.moves.push([r, col])
      }//end occupied position check
    }//end valid position check
  }//end row for loop
  /*
  //upward movement
  if (board.isValidPosition(row - 2, col)) {
    //space is on the board
    if (board.isOccupiedPosition(row - 2, col)) {
      //the space is occupied by a piece
      let target = board.positionAt(row - 2, col);
      if (utils.areOppositeColors(this, target)) {
        //the piece is an enemy
        actions.moves.push([row - 2, col]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row - 2, col])
    }
  }
  
  //downward movement
  if (board.isValidPosition(row + 2, col)) {
    //space is on the board
    if (board.isOccupiedPosition(row + 2, col)) {
      //the space is occupied by a piece
      let target = board.positionAt(row + 2, col);
      if (utils.areOppositeColors(this, target)) {
        //the piece is an enemy
        actions.moves.push([row + 2, col]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row + 2, col])
    }
  }
   */
  
  //diagonal checks
  for (let r = row - 1; r <= row + 1; r+=2) {
    for (let c = col - 1; c <= col + 1; c += 2){
      if (board.isValidPosition(r, c)) {
        //space is on the board
        if (board.isOccupiedPosition(r, c)) {
          //space is occupied already
          let target = board.positionAt(r, c);
          if (utils.areOppositeColors(this, target)) {
            //enemy piece for taking
            actions.moves.push([r, c]);
          }//end enemy check
        } else {
          //unoccupied valid space on the board
          actions.moves.push([r, c]);
        }//end occupied check
      }//end valid space on board
    }//end column for loop
  }//end row for loop
  
  /*//upward left diagonal
  if (board.isValidPosition(row - 1, col - 1)) {
    //space is on the board
    if (board.isOccupiedPosition(row - 1, col - 1)) {
      //space is occupied already
      let target = board.positionAt(row - 1, col - 1);
      if (utils.areOppositeColors(this, target)) {
        //enemy piece for taking
        actions.moves.push([row - 1, col - 1]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row - 1, col - 1]);
    }
  }
  
  //upward right movement
  if (board.isValidPosition(row - 1, col + 1)) {
    //space is on the board
    if (board.isOccupiedPosition(row - 1, col + 1)) {
      //space is occupied already
      let target = board.positionAt(row - 1, col + 1);
      if (utils.areOppositeColors(this, target)) {
        //enemy piece for taking
        actions.moves.push([row - 1, col + 1]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row - 1, col + 1]);
    }
  }
  
  //downward left movement
  if (board.isValidPosition(row + 1, col - 1)) {
    //space is on the board
    if (board.isOccupiedPosition(row + 1, col - 1)) {
      //space is occupied already
      let target = board.positionAt(row + 1, col - 1);
      if (utils.areOppositeColors(this, target)) {
        //enemy piece for taking
        actions.moves.push([row + 1, col - 1]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row + 1, col - 1]);
    }
  }
  
  //downward right movement
  if (board.isValidPosition(row + 1, col + 1)) {
    //space is on the board
    if (board.isOccupiedPosition(row + 1, col + 1)) {
      //space is occupied already
      let target = board.positionAt(row + 1, col + 1);
      if (utils.areOppositeColors(this, target)) {
        //enemy piece for taking
        actions.moves.push([row + 1, col + 1]);
      }
    } else {
      //unoccupied valid space on the board
      actions.moves.push([row + 1, col + 1]);
    }
  }
   */
};

module.exports = Frog;
