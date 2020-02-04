/*
* ****************************************************************************************
*                                        Unicorn
* ****************************************************************************************
* 
* This piece will have similar abilities as the knight, meaning that it can "hop"
* over pieces to get to it's valid spaces. As long as the resulting space is not occupied
* by a friendly piece, the space is valid for movement.
* 
* Movement and Capturing for this piece is:
*       three/two (3/2) spaces (closely to knight)
*       exactly one (1) orthogonally adjacent (left, right, up, and down)
* */

const utils = require('./utils');

function Unicorn(color) {
  this.id = 'U';
  this.color = color;
}

Unicorn.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };

  /* TODO: Ensure that loop logic is correct for movement */
  
  //check the left and right orthogonal
  for (let r = row - 1; r < row + 1; r += 2) {
    if(board.isValidPosition(r, col)) {
      if (board.isOccupiedPosition(r, col)) {
        let target = board.positionAt(r, col);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([r, col]);
        }//end enemy check
      } else {
        actions.moves.push([r, col]);
      }//end empty check
    }//end valid position check
  }//end row loop
  
  //check up and down orthogonals
  for (let c = col - 1; c <= col + 1; c += 2) {
    if(board.isValidPosition(row, c)) {
      if (board.isOccupiedPosition(row, c)) {
        let target = board.positionAt(row, c);
        if (utils.areOppositeColors(this, target)) {
          actions.moves.push([row, c]);
        }//end enemy check
      } else {
        actions.moves.push([row, c]);
      }//end empty check
    }//end valid position check
  }
  
  //check the upward left and right 3/2 and downward left and right 3/2 movements
  for (let r = row - 3; r <= row + 3; r += 6) {
    for (let c = col - 2; c <= col + 2; c += 4) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }//end enemy check
        } else {
          actions.moves.push([r, c]);
        }//end empty check
      }//end valid position check
    }//end column manipulation
  }//end row manipulation

  //check left upward and downward 3/2 and right upward and downward 3/2 movements 
  for (let r = row - 2; r <= row + 2; r += 4) {
    for (let c = col - 3; c <= col + 3; c += 6) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }//end enemy check
        } else {
          actions.moves.push([r, c]);
        }//end empty check
      }//end valid position check
    }//end column manipulation
  }//end row manipulation
};

module.exports = Unicorn;
