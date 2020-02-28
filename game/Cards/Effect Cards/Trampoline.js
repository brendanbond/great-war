/*
 * This is a shared class for trampoline and false trampoline cards
 * If there is a better and more efficient way to implement these two cards,
 * then this class is not needed at all.
 * 
 * It has a clear function internally to remove the trampoline after use automatically,
 * and will handle to movement checks for if the movement causes Check
 */

const utils = require('../../utils');
const location = [];

function Trampoline(row, col, real) {
  location[0] = row;
  location[1] = col;
  this.realTramp = real;
}

function jump(piece, target) {
  if (this.realTramp) {
    //real trampoline
    if (utils.areOppositeColors(piece, target)) {
      /* TODO: Determine how to check for king and whether the trampoline will cause check */
    }
    this.jumped();
  } else {
    //false trampoline
    /* TODO: Determine what the false trampoline can hide on the board */
  }
}

function jumped() {
  board.clearPosition(location[0], location[1]);
}
