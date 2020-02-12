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
  const [eventHandlersAreSetUp, setEventHandlersAreSetUp] = useState(false);
  const { registerEventHandler } = useSocket();

  useEffect(() => {
    if (!eventHandlersAreSetUp) {
      registerEventHandler("gameState", data => {
        console.log("gameState msg received");
        setGameState(data);
      });
      setEventHandlersAreSetUp(true);
    }
  }, [eventHandlersAreSetUp, registerEventHandler]);

  return { gameState };
}

GameStateProvider.propTypes = {
  children: PropTypes.element
};

export { GameStateProvider, useGameState };
