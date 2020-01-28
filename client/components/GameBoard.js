import React, { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import GameSquare from "./GameSquare";
import { arraysAreEqual } from "../utils/utils";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);

  io.on("boardUpdate", data => {
    setBoard(data);
  });

  io.on("possibleMoves", data => {
    setPossibleMoves(data);
  });

  const handleClick = (event, position) => {
    setSelectedSquare(position);
    if (board[position[0]][position[1]] != -1) {
      io.emit("getPossibleMoves", position);
    } else {
      setPossibleMoves(null);
    }
  };

  return (
    <div className="container game-board">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => {
              let highlighted = false;
              if (possibleMoves) {
                for (let i = 0; i < possibleMoves.moves.length; i++) {
                  highlighted = arraysAreEqual(
                    [rowIndex, colIndex],
                    possibleMoves.moves[i]
                  );
                  if (highlighted) break;
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
