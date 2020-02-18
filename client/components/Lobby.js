import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import GameInfoModal from "./GameInfoModal";
import { useGameList } from "../hooks/useGameList";
import { useGameState } from "../hooks/useGameState";
import { useSocket } from "../hooks/useSocket";

function Lobby() {
  const { gameList } = useGameList();
  const { gameState, getGameState } = useGameState();
  const { emitEvent } = useSocket();
  const [showGameModal, setShowGameModal] = useState(false);
  const [gameId, setGameId] = useState(null);
  const history = useHistory();

  const joinGame = () => {
    emitEvent("requestJoinGame", { gameId });
    history.push(`/game/${gameId}`);
  };

  const handleClose = () => {
    setShowGameModal(null); // TODO: unlike when you click out of the modal, this handleClose method doesn't result in an animation
  };

  return gameList ? (
    <div>
      <div className="container text-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            emitEvent("createGame");
          }}
        >
          Create
        </button>
      </div>
      {gameList.map((gameId, index) => {
        return (
          <div key={index} className="container">
            <button
              className="btn btn-primary"
              onClick={() => {
                getGameState(gameId);
                setShowGameModal(true);
                setGameId(gameId);
              }}
            >
              {gameId}
            </button>
          </div>
        );
      })}

      <GameInfoModal
        show={showGameModal}
        onHide={() => setShowGameModal(false)}
        gameState={gameState}
        handleClose={handleClose}
        joinGame={joinGame}
      />
    </div>
  ) : (
    <div>{/* TODO: add loader here */}</div>
  );
}

Lobby.propTypes = {
  history: PropTypes.array
};

export default Lobby;
