import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./hooks/useSocket";
import { GameStateProvider } from "./hooks/useGameState";
import { GameListProvider } from "./hooks/useGameList";
import Lobby from "./components/Lobby";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <GameListProvider>
              <Lobby />
            </GameListProvider>
          </Route>
          {/* TODO: make these redirect if not accessed from the lobby */}
          <Route path="/game/:gameid">
            <GameStateProvider>
              <GameBoard />
            </GameStateProvider>
          </Route>
        </Switch>
      </Router>
    </SocketProvider>
  );
}

export default App;
