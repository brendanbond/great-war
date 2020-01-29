import React, { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import GameSquare from "./GameSquare";
import { arraysAreEqual } from "../utils/utils";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  // const [actions, setActions] = useState(null);

  io.on("boardUpdate", data => {
    setBoard(data);
  });

  const handleClick = (event, position) => {
    let piece = board[position[0]][position[1]];
    setSelectedSquare(piece);
  };

  return (
    <div className="container game-board">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => {
              let highlighted = false;
              if (selectedSquare && selectedSquare.actions) {
                for (let i = 0; i < selectedSquare.actions.moves.length; ++i) {
                  if (
                    arraysAreEqual(
                      [rowIndex, colIndex],
                      selectedSquare.actions.moves[i]
                    )
                  ) {
                    highlighted = true;
                    break;
                  }
                }
              }
              return (
                <GameSquare
                  onClick={() => {
                    handleClick(event, [rowIndex, colIndex]);
                  }}
                  key={colIndex}
                  value={col.id}
                  position={[rowIndex, colIndex]}
                  selected={
                    selectedSquare &&
                    arraysAreEqual([rowIndex, colIndex], selectedSquare)
                      ? true
                      : false
                  }
                  highlighted={highlighted}
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
