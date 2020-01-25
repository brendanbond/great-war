import React from "react";
import GameSquare from "./GameSquare";

function GameBoard(props) {
  return (
    <div className="game-board">
      {props.board.map((row, index) => {
        return (
          <div key={index} className="game-board-row">
            {row.map((col, index) => {
              return <GameSquare key={index} value={col} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
