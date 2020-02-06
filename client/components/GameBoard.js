import React, { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import GameSquare from "./GameSquare";
import { arraysAreEqual } from "../utils";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveState, setMoveState] = useState(false);

  io.on("boardUpdate", data => {
    setBoard(data);
  });

  const reset = event => {
    io.emit("reset");
  };

  const handleClick = (event, position) => {
    /* if we're not already in move state and a piece occupies the clicked square, move us into move state */
    if (moveState === false) {
      setSelectedSquare(position);
      /* if selected square has a piece that matches the turn, enter move state */
      /* TODO: check whose turn it is */
      if (board[position[0]][position[1]] != -1) {
        setMoveState(true);
      }
      /* if we're already in move state, click should begin to execute a move */
    } else {
      let piece = board[selectedSquare[0]][selectedSquare[1]];

      for (let i = 0; i < piece.actions.moves.length; i++) {
        /* if destination is one of possible actions, execute a move */

        let move = piece.actions.moves[i];
        if (arraysAreEqual(move, position)) {
          let data = {
            row: selectedSquare[0],
            col: selectedSquare[1],
            destRow: move[0],
            destCol: move[1]
          };
          io.emit("executeMove", data);
          setMoveState(false);
          setSelectedSquare(null);
          return;
        }
      }

      setMoveState(false);
      setSelectedSquare(position);
    }
  };

  return (
    <div className="container game-board">
      <button className="btn btn-lg" onClick={reset}>
        Reset
      </button>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => {
              let highlighted = false;
              if (selectedSquare) {
                let piece = board[selectedSquare[0]][selectedSquare[1]];
                if (piece.actions) {
                  for (let i = 0; i < piece.actions.moves.length; ++i) {
                    if (
                      arraysAreEqual(
                        [rowIndex, colIndex],
                        piece.actions.moves[i]
                      )
                    ) {
                      highlighted = true;
                      break;
                    }
                  }
                }
              }
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
                      ? true
                      : false
                  }
                  highlighted={highlighted}
                  colored={(rowIndex + colIndex) % 2}
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
