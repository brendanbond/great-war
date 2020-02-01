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
