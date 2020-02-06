import React from "react";

function GameRow() {
  return (
    <div key={rowIndex} className="row">
      {row.map((col, colIndex) => {
        return (
          <GameSquare
            onClick={() => {
              handleClick(event, [rowIndex, colIndex]);
            }}
            key={colIndex}
            value={col.symbol}
            position={[rowIndex, colIndex]}
            selected={
              selectedSquare &&
              arraysAreEqual([rowIndex, colIndex], selectedSquare)
            }
            highlighted={squareIsHighlighted(rowIndex, colIndex)}
            colored={(rowIndex + colIndex) % 2}
          />
        );
      })}
    </div>
  );
}

export default GameRow;
