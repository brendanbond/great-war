import React, { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { useSocket } from "./useSocket";

const GameStateContext = createContext();

function GameStateProvider({ children }) {
  const gameState = useProvideGameState();
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  return useContext(GameStateContext);
}

function useProvideGameState() {
  const [gameState, setGameState] = useState(null);
  const [gameIsReadyToBegin, setGameIsReadyToBegin] = useState(false);
  const [eventHandlersAreSetUp, setEventHandlersAreSetUp] = useState(false);
  const { registerEventHandler, emitEvent } = useSocket();

  useEffect(() => {
    if (!eventHandlersAreSetUp) {
      registerEventHandler("gameState", gameState => {
        console.log("gameState msg received");
        setGameState(gameState);
      });

      registerEventHandler("gameIsReadyToBegin", () => {
        console.log("gameIsReadyToBegin msg received.");
        setGameIsReadyToBegin(true);
      });

      setEventHandlersAreSetUp(true);
    }
  }, [eventHandlersAreSetUp, registerEventHandler]);

  const getGameState = gameId => {
    emitEvent("getGameState", { gameId });
  };

  return { gameState, getGameState, gameIsReadyToBegin };
}

GameStateProvider.propTypes = {
  children: PropTypes.element
};

export { GameStateProvider, useGameState };
