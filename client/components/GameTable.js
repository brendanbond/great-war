import React from "react";
import Container from "react-bootstrap/Container";
import GameBoard from "./GameBoard";
import PlayerInfo from "./PlayerInfo";
import PlayerDeck from "./PlayerDeck";
import { useGameState } from "../hooks/useGameState";

function GameTable() {
  const { gameState, gameIsReadyToBegin } = useGameState();

  return (
    <Container>
      <PlayerInfo gameState={gameState} />
      <div>
        <h1 className="text-center">
          {"Current turn: " + gameState ? gameState.currentPlayer.title : "..."}
        </h1>
      </div>
      <GameBoard
        gameState={gameState}
        gameIsReadyToBegin={gameIsReadyToBegin}
      />
      <PlayerDeck />
    </Container>
  );
}

export default GameTable;
