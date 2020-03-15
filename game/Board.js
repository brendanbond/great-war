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
  this.defaultSetup();
}

Board.prototype.defaultSetup = function() {
  for (let i = 0; i < NROWS; ++i) {
    this.grid.push([]);
    for (let j = 0; j < NCOLS; ++j) {
      this.grid[i].push(EMPTY);
    }
  }

  this.setPosition(new Rook("black"), 0, 0);
  this.setPosition(new Knight("black"), 0, 1);
  this.setPosition(new Bishop("black"), 0, 2);
  this.setPosition(new Queen("black"), 0, 3);
  this.setPosition(new King("black"), 0, 4);
  this.setPosition(new Bishop("black"), 0, 5);
  this.setPosition(new Knight("black"), 0, 6);
  this.setPosition(new Rook("black"), 0, 7);

  this.setPosition(new Pawn("black"), 1, 0);
  this.setPosition(new Pawn("black"), 1, 1);
  this.setPosition(new Pawn("black"), 1, 2);
  this.setPosition(new Pawn("black"), 1, 3);
  this.setPosition(new Pawn("black"), 1, 4);
  this.setPosition(new Pawn("black"), 1, 5);
  this.setPosition(new Pawn("black"), 1, 6);
  this.setPosition(new Pawn("black"), 1, 7);

  this.setPosition(new Pawn("white"), 6, 0);
  this.setPosition(new Pawn("white"), 6, 1);
  this.setPosition(new Pawn("white"), 6, 2);
  this.setPosition(new Pawn("white"), 6, 3);
  this.setPosition(new Pawn("white"), 6, 4);
  this.setPosition(new Pawn("white"), 6, 5);
  this.setPosition(new Pawn("white"), 6, 6);
  this.setPosition(new Pawn("white"), 6, 7);

  this.setPosition(new Rook("white"), 7, 0);
  this.setPosition(new Knight("white"), 7, 1);
  this.setPosition(new Bishop("white"), 7, 2);
  this.setPosition(new Queen("white"), 7, 3);
  this.setPosition(new King("white"), 7, 4);
  this.setPosition(new Bishop("white"), 7, 6);
  this.setPosition(new Knight("white"), 7, 5);
  this.setPosition(new Rook("white"), 7, 7);
};

Board.prototype.forEachPiece = function(process) {
  for (let row = 0; row < this.nrows(); ++row) {
    for (let col = 0; col < this.ncols(); ++col) {
      if (this.grid[row][col] !== EMPTY) {
        process(this.grid[row][col], row, col);
      }
    }
  }
};

Board.prototype.setPosition = function(piece, row, col) {
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

Board.prototype.nrows = function() {
  return this.grid.length;
};

Board.prototype.ncols = function() {
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
