import React, { useState } from "react";
import SocketIOClient from "socket.io-client";
import GameBoard from "./components/GameBoard";
import "./App.css";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function reset(event) {
  io.emit("reset");
}

function App() {
  return (
    <div className="App">
      <button className="btn btn-lg" onClick={reset}>
        Reset
      </button>
      <GameBoard />
    </div>
  );
}

export default App;
