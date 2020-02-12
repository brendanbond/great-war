import React, { useState } from "react";
import PropTypes from "prop-types";
import GameRow from "./GameRow";
import { useSocket } from "../hooks/useSocket";
import { useGameState } from "../hooks/useGameState";
import { arraysAreEqual } from "../utils";

function GameBoard() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveState, setMoveState] = useState(false);
  const { emitEvent } = useSocket();
  const { gameState } = useGameState();

  /* TODO: atomize this */
  const handleClick = (event, position) => {
    /* if we're not already in move state and a piece occupies the clicked square, move us into move state */
    if (moveState === false) {
      setSelectedSquare(position);
      /* if selected square has a piece that matches the turn, enter move state */
      /* TODO: check whose turn it is */
      if (gameState.board[position[0]][position[1]] != -1) {
        setMoveState(true);
      }
      /* if we're already in move state, click should begin to execute a move */
    } else {
      let piece = gameState.board[selectedSquare[0]][selectedSquare[1]];

      for (let i = 0; i < piece.actions.moves.length; i++) {
        /* if destination is one of possible actions, execute a move */
        let move = piece.actions.moves[i];
        if (arraysAreEqual(move, position)) {
          let moveData = {
            id: gameState.id,
            row: selectedSquare[0],
            col: selectedSquare[1],
            destRow: move[0],
            destCol: move[1]
          };
          emitEvent("executeMove", moveData);
          setMoveState(false);
          setSelectedSquare(null);
          return;
        }
      }
      setMoveState(false);
      setSelectedSquare(position);
    }
  };

  return gameState ? (
    <div className="container game-board">
      {gameState.board.map((row, rowIndex) => {
        return (
          <GameRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            handleClick={handleClick}
            selectedSquare={selectedSquare}
            board={gameState.board}
          />
        );
      })}
    </div>
  ) : (
    <div>{/* TODO: Add loading component here. */}</div>
  );
}

GameBoard.propTypes = {
  gameState: PropTypes.shape({
    id: PropTypes.string,
    board: PropTypes.array,
    player: PropTypes.object
  }),
  io: PropTypes.object
};

export default GameBoard;
