import React, { useState } from "react";
import GameRow from "./GameRow";
import { arraysAreEqual } from "../utils";
import { useSocketConnection } from "../hooks/useSocketConnection";

function GameBoard() {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveState, setMoveState] = useState(false);
  const { io } = useSocketConnection({ setBoard });

  const reset = () => {
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

      for (let i = 0; i < piece.moves.length; i++) {
        /* if destination is one of possible actions, execute a move */

        let move = piece.moves[i];
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
          <GameRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            handleClick={handleClick}
            selectedSquare={selectedSquare}
            board={board}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;
