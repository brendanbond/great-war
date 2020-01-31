const King = require("./King");
const Pawn = require("./Pawn");

const EMPTY = -1;

//prettier-ignore
const DEFAULT_SETUP = [
  [EMPTY, EMPTY, EMPTY, EMPTY, new King("black"), EMPTY, EMPTY, EMPTY, EMPTY],
  [new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black"), new Pawn("black")],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white"), new Pawn("white")],
  [EMPTY, EMPTY, EMPTY, EMPTY, new King("white"), EMPTY, EMPTY, EMPTY, EMPTY]
];

function Board(grid) {
  this.grid = grid || DEFAULT_SETUP;
}

Board.prototype.setPosition = function(row, col, piece) {
  if (!this.isValidPosition(row, col)) {
    throw "Invalid position (" +
      row +
      ", " +
      col +
      ") passed to Board#setPosition()";
  }
  this.grid[row][col] = piece;
};

Board.prototype.clearPosition = function(row, col) {
  if (!this.isValidPosition(row, col)) {
    throw "Invalid position (" +
      row +
      ", " +
      col +
      ") passed to Board#clearPosition()";
  }
  this.grid[row][col] = EMPTY;
};

Board.prototype.nRows = function() {
  return this.grid.length;
};

Board.prototype.nCols = function(row) {
  if (row < 0 || row >= this.nRows()) {
    throw "Invalid row " + row + " passed to Board#nCols()";
  }
  return this.grid[row].length;
};

Board.prototype.positionAt = function(row, col) {
  if (!this.isValidPosition(row, col)) {
    throw "Invalid position (" +
      row +
      ", " +
      col +
      ") passed to Board#positionAt()";
  }
  return this.grid[row][col];
};

Board.prototype.isValidPosition = function(row, col) {
  return (
    row >= 0 &&
    row < this.grid.length &&
    col >= 0 &&
    col < this.grid[row].length
  );
};

Board.prototype.isEmptyPosition = function(row, col) {
  return this.positionAt(row, col) === EMPTY;
};

Board.prototype.isOccupiedPosition = function(row, col) {
  return !this.isEmptyPosition(row, col);
};

module.exports = Board;
