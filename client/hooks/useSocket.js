import React, { useContext, createContext } from "react";
import SocketIOClient from "socket.io-client";
import PropTypes from "prop-types";

const endpoint = "http://localhost:5000";
const io = SocketIOClient(endpoint);

const SocketContext = createContext(io);

function SocketProvider({ children }) {
  const socket = useSocketProvider();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

function useSocketProvider() {
  const registerEventHandler = (event, callback) => {
    if (typeof event !== "string") {
      throw new Error("Event passed to registerEventHandler must be a string");
    }

    if (typeof callback !== "function") {
      throw new Error(
        "Callback passed to registerEventHandler must be a function"
      );
    }
    /* TODO: probably need way more error handling here */
    io.on(event, callback);
  };

  const emitEvent = (event, data) => {
    if (typeof event !== "string") {
      throw new Error("Event passed to emitEvent must be a string");
    }

    io.emit(event, data);
  };

  return { registerEventHandler, emitEvent };
}

SocketProvider.propTypes = {
  children: PropTypes.element
};

export { SocketProvider, useSocket };
