import React from "react";
import PropTypes from "prop-types";
import GameSquare from "./GameSquare";
import { arraysAreEqual } from "../utils";

function GameRow({ row, rowIndex, handleClick, selectedSquare, board }) {
  const squareIsHighlighted = (row, col) => {
    if (selectedSquare) {
      let piece = board[selectedSquare[0]][selectedSquare[1]];
      if (piece !== -1) {
        for (let i = 0; i < piece.moves.length; ++i) {
          if (arraysAreEqual([row, col], piece.moves[i])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <div key={rowIndex} className="row">
      {row.map((col, colIndex) => {
        return (
          <GameSquare
            onClick={() => {
              handleClick(event, [rowIndex, colIndex]);
            }}
            key={JSON.stringify([rowIndex, colIndex])}
            symbol={col.symbol}
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

GameRow.propTypes = {
  row: PropTypes.array,
  rowIndex: PropTypes.number,
  handleClick: PropTypes.func,
  selectedSquare: PropTypes.array,
  board: PropTypes.array
};

export default GameRow;
