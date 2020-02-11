﻿function PawnCard(cost) {
  Card.call(this, cost, 'Pawn', []);
}

PawnCard.prototype = Object.create(Card.prototype);

Object.defineProperty(PawnCard.prototype, 'constructor', {
  value: PawnCard,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
