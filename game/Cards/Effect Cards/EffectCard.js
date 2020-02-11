let boardEffect;

﻿function EffectCard(cost, isBoardEffect) {
  Card.call(this, cost, 'Effect', []);
  this.setBoardEffect(isBoardEffect)
}

function setBoardEffect(isBoardEffect) {
  this.boardEffect = isBoardEffect;
}

function isBoardEffect() {
  return boardEffect;
}

EffectCard.prototype = Object.create(Card.prototype);

Object.defineProperty(EffectCard.prototype, 'constructor', {
  value: EffectCard,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });
