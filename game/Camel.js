/*
* ****************************************************************************************
*                                         Camel
* ****************************************************************************************
* 
* This piece will be able to move similarly to a knight except is extended from 2/1 to 3/1
* This piece will also be able to "hop" over any pieces as long as the resulting square is
* not occupied by a friendly piece
* 
* Movement and Capturing for this piece is:
*       moves in a three/one (3/1) pattern in any direction (similar style to knight)
* */

/* TODO: Tempted to make it interesting and keep this piece from "hopping" over pieces */
const utils = require('./utils');

function Camel(color) {
  this.id = 'C';
  this.color = color;
}

Camel.prototype.getActions = function(board, row, col) {
  let actions = {
    moves: []
  };
  
  //check the upward and downward movements
  for (let r = row - 3; r <= row + 3; r += 6) {
    for (let c = col - 1; c <= col + 1; c += 2) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }//end empty check
      }//end valid space check
    }//end column manipulation loop
  }//end row manipulation loop

  //check the left and right movements
  for (let r = row - 1; r <= row + 1; r += 2) {
    for (let c = col - 3; c <= col + 3; c += 6) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);

          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }//end empty check
      }//end valid space check
    }//end column manipulation loop
  }//end row manipulation loop
};
