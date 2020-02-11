﻿function PieceCard(cost) {
  Card.call(this, cost, 'Piece', ['Place']);
}

PieceCard.prototype = Object.create(Card.prototype);

Object.defineProperty(PieceCard.prototype, 'constructor', {
  value: PieceCard,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
