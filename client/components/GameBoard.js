import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import GameRow from "./GameRow";
import { useSocket } from "../hooks/useSocket";
import { arraysAreEqual } from "../utils";

function GameBoard({ gameState, gameIsReadyToBegin }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveState, setMoveState] = useState(false);
  const { emitEvent } = useSocket();

  /* TODO: atomize this */
  const handleClick = (event, position) => {
    if (!gameIsReadyToBegin) return;

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
      <Container className="game-board">
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
      </Container>
    ) : (
      <Container>Loading...</Container>
    )
  ) : (
    <Container>Waiting on another player....</Container>
  );
}

export default GameBoard;
