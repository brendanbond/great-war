import React, { useState } from "react";
import SocketIOClient from "socket.io-client";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;
