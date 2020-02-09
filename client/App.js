import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <WaitingRoom /> */}
        </Route>
        <Route path="/game/:gameid">
          <GameBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
