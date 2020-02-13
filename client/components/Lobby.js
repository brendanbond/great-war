import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGameList } from "../hooks/useGameList";
import { useSocket } from "../hooks/useSocket";

function Lobby() {
  const { gameList } = useGameList();
  const { emitEvent } = useSocket();

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
              <Link
                to={`/game/${gameId}`}
                onClick={() => {
                  emitEvent("requestJoinGame", { gameId });
                }}
              >
                {gameId}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div></div>
  );
}

Lobby.propTypes = {
  gameList: PropTypes.array
};

export default Lobby;
