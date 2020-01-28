import React, { useState } from "react";
import SocketIOClient from "socket.io-client";
import GameBoard from "./components/GameBoard";
import "./App.css";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function App() {
  console.log("App function call");
  const [board, setBoard] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState(null);

  io.on("boardUpdate", data => {
    setBoard(data);
  });

  io.on("possibleMoves", data => {
    setPossibleMoves(data);
    console.log(data);
  });

  return (
    <div className="App">
      <GameBoard socket={io} board={board} />
    </div>
  );
}

export default App;
