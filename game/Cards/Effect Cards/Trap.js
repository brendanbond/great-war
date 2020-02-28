/*
 * A class for both the trap and false trap cards.
 * If there is a better and more efficient way to implement both of these cards,
 * this class will not be needed
 * 
 * This class has a function the spring the trap when a piece lands on it
 */
const location = [];

function Trap(row, col, realTrap) {
  location[0] = row;
  location[1] = col;
  this.realTrap = realTrap;
}

function spring() {
  if (this.realTrap) {
    //real trap
    /* TODO: Determine how to handle the captures when the trap is sprung */
    board.clearPosition(location[0], location[1]);
  } else {
    //false trap
    /* TODO: Determine what can be hidden on the board by this card */
  }
}
