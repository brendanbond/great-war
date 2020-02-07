import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

function useSocketConnection({ setBoard }) {
  const [connectionIsSetup, setConnectionIsSetup] = useState(false);

  useEffect(() => {
    if (!connectionIsSetup) {
      io.on("boardUpdate", data => {
        setBoard(data);
      });
      setConnectionIsSetup(true);
    }
  }, [connectionIsSetup, setBoard]);

  return { io };
}

export { useSocketConnection };
