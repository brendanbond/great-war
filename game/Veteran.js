/*
* ****************************************************************************************
*                                       Veteran
* ****************************************************************************************
* 
* This piece will potentially be a fairly powerful piece. It has the same move/capture set
* as the knight and king combined. Due to it's veteran status, it knows how to maneuver on
* the battle field and is not stopped by any piece (when moving in 2/1 fashion)
* 
* Movement and Capturing for this piece is:
*       Exactly two/1 (2/1) in any direction (like a Knight)
*       Exactly one (1) space in any direction (like a king)
* */
const utils = require('./utils');

function Veteran(color) {
  this.id = 'V';
  this.color = color;
}

Veteran.prototype.getActions = function (board, row, col) {
  let actions = {
    moves: []
  };
  
  //check forward and backward knight-like moves
  for (let r = row - 2; r <= row + 2; r += 4) {
    for (let c = col - 1; c <= col + 1; c += 2) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }
      }
    }
  }
  
  //check left and right knight-like moves
  for (let r = row - 1; r <= row + 1; r += 2) {
    for (let c = col - 2; c <= col + 2; c += 4) {
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);

          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }
      }
    }
  }
  
  //check all king-like moves
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r === row && c === col) {
        //current space is where the veteran currently is located on the board
        continue;
      }

      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);

          if (utils.areOppositeColors(this, target)) {
            actions.moves.push([r, c]);
          }
        } else {
          actions.moves.push([r, c]);
        }
      }
    }
  }
};
