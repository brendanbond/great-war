const Bishop = require("./Bishop");
const King = require("./King");
const Knight = require("./Knight");
const Pawn = require("./Pawn");
const Queen = require("./Queen");
const Rook = require("./Rook");

const EMPTY = -1;

function Board(grid) {
  const DEFAULT_SETUP = [
    [
      new Rook("black"),
      new Knight("black"),
      new Bishop("black"),
      new Queen("black"),
      new King("black"),
      new Bishop("black"),
      new Knight("black"),
      new Rook("black")
    ],
    [
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black"),
      new Pawn("black")
    ],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white"),
      new Pawn("white")
    ],
    [
      new Rook("white"),
      new Knight("white"),
      new Bishop("white"),
      new Queen("white"),
      new King("white"),
      new Bishop("white"),
      new Knight("white"),
      new Rook("white")
    ]
  ];

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
  return this.positionAt(row, col) === EMPTY;
};

Board.prototype.isOccupiedPosition = function(row, col) {
  return !this.isEmptyPosition(row, col);
};

module.exports = Board;
