import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./hooks/useSocket";
import { GameStateProvider } from "./hooks/useGameState";
import { GameListProvider } from "./hooks/useGameList";
import Lobby from "./components/Lobby";
import GameTable from "./components/GameTable";
import "./App.css";

function App() {
  return (
    <SocketProvider>
      <GameStateProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <GameListProvider>
                <Lobby />
              </GameListProvider>
            </Route>
            {/* TODO: make these redirect if not accessed from the lobby */}
            <Route path="/game/:gameid">
              <GameTable />
            </Route>
          </Switch>
        </Router>
      </GameStateProvider>
    </SocketProvider>
  );
}

export default App;
