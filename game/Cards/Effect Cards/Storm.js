/*
 * Pseudo-Piece that will keep pieces from moving to spaces that are within the Sudden Storm
 * Card effect. If not needed and a better way to implement this is thought of, then this
 * class will not be needed.
 * 
 * This handles the random turns count between 2 and 4 internally and has a decrement function
 * internally, and a clearStorm function to remove the storm when the storm is over automatically.
 */

let turns;
const max = 4;
const min = 3;
let location = [];

function Storm(row, col) {
  this.id = "Storm";
  this.turns = min + Math.round(Math.random() * (max - min + 1));
  location[0] = row;
  location[1] = col;
}

function passTurn() {
  if (turns > 0) {
    this.turns--;
  }
  
  if (this.turns <= 0) {
    clearStorm();
  }
}

function clearStorm() {
  for (let row = location[0] - 1; row <= location[0] + 1; row++) {
    for (let col = location[1] - 1; col <= location[1] + 1; col++) {
      if (board.positionAt(r, c).id === "Storm") {
        board.clearPosition(r, c);
      } else {
        /* TODO: Allow the pieces that were in the storm to move again */
      }
    }
  }
}
