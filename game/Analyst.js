/*
* ****************************************************************************************
*                                         Analyst
* ****************************************************************************************
* 
* This piece will be more of a strategic piece that takes some skill to use. This piece
* will allow any pawns in a one (1) square radius around it to move in the manner of
* their designated promotion piece(s) for only one turn 
* 
* Movement and Capturing for this piece is:
*       Exactly one (1) space in every direction except directly backward
* */

const utils = require('./utils');

function Analyst(color) {
  this.id = 'A';
  this.color = color;
}

Analyst.prototype.getActions = function (board, row, col) {
  /* TODO: Should the pawn check also happen during the moves calculation or should it be done separately?
  *   Or does that get handled with the pawn class/object entirely? */
  let actions = {
    moves: [],
    pawns: []
  };
  
  //check available moves
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if ((r === row && c === col) || (r === row + 1 && c === col)) {
        /* This means that the current space is either where the piece is,
         * or it is the space directly behind it
         * The continue statement will skip the moves calculations either way
         */
        
        continue;
      }
      
      if (board.isValidPosition(r, c)) {
        if (board.isOccupiedPosition(r, c)) {
          let target = board.positionAt(r, c);
          
          if (utils.areOppositeColors(this, target)){
            actions.moves.push([r, c]);
          } else if (target.id === 'P') {
            /* TODO: Make sure this stays checking for friendly pawns through ID*/
            //this means that the piece at this position is a friendly pawn
            actions.pawns.push([r, c]);
          }//end enemy check
        } else {
          actions.moves.push([r, c]);
        }//end occupied check
      }//en validity check
    }//end column manipulation
  }//end row manipulation
  
  /* 
   * check for nearby friendly pawns
   * might not be needed since the checks are contained within the moves checks
   */
};

module.exports = Analyst;
