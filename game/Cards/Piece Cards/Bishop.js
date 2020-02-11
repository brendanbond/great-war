﻿function Bishop() {
  PieceCard.call(this, 3.5);
}

//these statements allow the piece to inherit from the PieceCard class
Bishop.prototype = Object.create(PieceCard.prototype);

Object.defineProperty(Bishop.prototype, 'constructor', {
  value: Bishop,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
