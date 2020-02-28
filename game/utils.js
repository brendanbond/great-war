exports.arraysAreEqual = function(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

exports.areOppositeColors = function(pieceA, pieceB) {
  return (
    (pieceA.color === "white" && pieceB.color === "black") ||
    (pieceA.color === "black" && pieceB.color === "white")
  );
};

/* TODO: How to determine the piece type */
exports.isMassive = (target) => {
  const massives = ['Dabbaba', 'Alfil', 'Rook', 'Massive Pawn'];
  
  /* TODO: Determine all massive pieces */
  
  return massives.includes(target.id);
};

exports.isRoyalty = (target) => {
  const royalty = ['King', 'Queen', 'Prince', 'Princess', 'Ferz'];
  
  return royalty.includes(target.id);
};
