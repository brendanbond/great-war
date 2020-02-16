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
  const { gameState, gameIsReadyToBegin } = useGameState();

  /* TODO: atomize this */
  const handleClick = (event, position) => {
    if (moveState === false) {
      setSelectedSquare(position);
      /* TODO: check whose turn it is */
      if (gameState.board[position[0]][position[1]] != -1) {
        setMoveState(true);
      }
    } else {
      let piece = gameState.board[selectedSquare[0]][selectedSquare[1]];
      for (let i = 0; i < piece.actions.moves.length; i++) {
        let move = piece.actions.moves[i];
        if (arraysAreEqual(move, position)) {
          emitEvent("executeMove", {
            gameId: gameState.id,
            row: selectedSquare[0],
            col: selectedSquare[1],
            destRow: move[0],
            destCol: move[1]
          });
          setMoveState(false);
          setSelectedSquare(null);
          return;
        }
      }
      setMoveState(false);
      setSelectedSquare(position);
    }
  };

  return gameIsReadyToBegin ? (
    gameState ? (
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
      <div>Loading...</div>
    )
  ) : (
    <div>Waiting on player...</div>
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
