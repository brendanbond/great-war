import React, { useState } from "react";
import PropTypes from "prop-types";
import GameInfoModal from "./GameInfoModal";
import { useGameList } from "../hooks/useGameList";
import { useGameState } from "../hooks/useGameState";
import { useSocket } from "../hooks/useSocket";

function Lobby() {
  const { gameList } = useGameList();
  const { gameState, getGameState } = useGameState();
  const { emitEvent } = useSocket();
  const [showGameModal, setShowGameModal] = useState(null);

  return gameList ? (
    <div>
      <button
        onClick={() => {
          emitEvent("createGame");
        }}
      >
        Create
      </button>
      <ul>
        {gameList.map((gameId, index) => {
          return (
            <li key={index}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  getGameState(gameId);
                  setShowGameModal(gameId);
                }}
              >
                {gameId}
              </button>
            </li>
          );
        })}
      </ul>
      <GameInfoModal
        show={Boolean(showGameModal)}
        onHide={() => setShowGameModal(null)}
        gameState={gameState}
      />
    </div>
  ) : (
    <div>{/* TODO: add loader here */}</div>
  );
}

Lobby.propTypes = {
  gameList: PropTypes.array
};

export default Lobby;
