import React, { useState } from "react";
import SocketIOClient from "socket.io-client";
import GameBoard from "./components/GameBoard";
import "./App.css";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function App() {
  console.log("App function call");
  const [board, setBoard] = useState([]);

  io.on("boardUpdate", data => {
    setBoard(data);
  });

  return (
    <div className="App">
      <GameBoard board={board} />
    </div>
  );
}

export default App;
