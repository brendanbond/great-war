import React, { useState } from "react";
import GameSquare from "./GameSquare";

function GameBoard(props) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleClick = (event, value, position) => {
    props.getPossibleMoves(value, position);
    /* TODO: use event.target to illuminate square */
  };

  return (
    <div className="container game-board">
      {props.board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => {
              return (
                <GameSquare
                  onClick={() => {
                    handleClick(event, col, [rowIndex, colIndex]);
                  }}
                  key={colIndex}
                  value={col}
                  position={[rowIndex, colIndex]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
