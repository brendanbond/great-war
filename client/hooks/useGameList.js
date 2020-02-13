import React, { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { useSocket } from "./useSocket";

const GameListContext = createContext();

function GameListProvider({ children }) {
  const gameList = useProvideGameList();
  return (
    <GameListContext.Provider value={gameList}>
      {children}
    </GameListContext.Provider>
  );
}

function useGameList() {
  return useContext(GameListContext);
}

function useProvideGameList() {
  const [gameList, setGameList] = useState();
  const { registerEventHandler } = useSocket();
  const [eventHandlersAreSetUp, setEventHandlersAreSetUp] = useState(false);

  useEffect(() => {
    if (!eventHandlersAreSetUp) {
      registerEventHandler("listUpdate", data => {
        setGameList(data);
      });
      setEventHandlersAreSetUp(true);
    }
  }, [registerEventHandler, eventHandlersAreSetUp]);

  return { gameList };
}

GameListProvider.propTypes = {
  children: PropTypes.element
};

export { GameListProvider, useGameList };
