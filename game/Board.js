const Bishop = require("./Bishop");
const King = require("./King");
const Knight = require("./Knight");
const Pawn = require("./Pawn");
const Queen = require("./Queen");
const Rook = require("./Rook");

const NROWS = 8;
const NCOLS = 8;
const EMPTY = -1;

function Board() {
  this.grid = [];
  this.pieces = [];
  this.defaultSetup();
}

Board.prototype.defaultSetup = function() {
  for (let i = 0; i < NROWS; ++i) {
    this.grid.push([]);
    for (let j = 0; j < NCOLS; ++j) {
      this.grid[i].push(EMPTY);
    }
  }

  this.setPosition(new Rook("black"), 0, 0, true);
  this.setPosition(new Knight("black"), 0, 1, true);
  this.setPosition(new Bishop("black"), 0, 2, true);
  this.setPosition(new Queen("black"), 0, 3, true);
  this.setPosition(new King("black"), 0, 4, true);
  this.setPosition(new Bishop("black"), 0, 5, true);
  this.setPosition(new Knight("black"), 0, 6, true);
  this.setPosition(new Rook("black"), 0, 7, true);

  this.setPosition(new Pawn("black"), 1, 0, true);
  this.setPosition(new Pawn("black"), 1, 1, true);
  this.setPosition(new Pawn("black"), 1, 2, true);
  this.setPosition(new Pawn("black"), 1, 3, true);
  this.setPosition(new Pawn("black"), 1, 4, true);
  this.setPosition(new Pawn("black"), 1, 5, true);
  this.setPosition(new Pawn("black"), 1, 6, true);
  this.setPosition(new Pawn("black"), 1, 7, true);

  this.setPosition(new Pawn("white"), 6, 0, true);
  this.setPosition(new Pawn("white"), 6, 1, true);
  this.setPosition(new Pawn("white"), 6, 2, true);
  this.setPosition(new Pawn("white"), 6, 3, true);
  this.setPosition(new Pawn("white"), 6, 4, true);
  this.setPosition(new Pawn("white"), 6, 5, true);
  this.setPosition(new Pawn("white"), 6, 6, true);
  this.setPosition(new Pawn("white"), 6, 7, true);

  this.setPosition(new Rook("white"), 7, 0, true);
  this.setPosition(new Knight("white"), 7, 1, true);
  this.setPosition(new Bishop("white"), 7, 2, true);
  this.setPosition(new Queen("white"), 7, 3, true);
  this.setPosition(new King("white"), 7, 4, true);
  this.setPosition(new Bishop("white"), 7, 6, true);
  this.setPosition(new Knight("white"), 7, 5, true);
  this.setPosition(new Rook("white"), 7, 7, true);
};

Board.prototype.setPosition = function(piece, row, col, setup) {
  if (!this.isValidPosition(row, col)) {
    throw "Invalid position (" +
      row +
      ", " +
      col +
      ") passed to Board#setPosition()";
  }
  this.grid[row][col] = piece;

  if (setup) {
    this.pieces.push(piece);
  }
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

Board.prototype.nCols = function() {
  return this.grid[0].length;
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
  return this.isValidPosition(row, col) && this.positionAt(row, col) === EMPTY;
};

Board.prototype.isOccupiedPosition = function(row, col) {
  return this.isValidPosition(row, col) && this.positionAt(row, col) !== EMPTY;
};

module.exports = Board;
