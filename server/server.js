const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");

const Game = require("../game/Game");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = http.createServer(app);
const io = socketIO(server);

let games = {};

const createGame = () => {
  let newGame = new Game();
  games[newGame.id] = newGame;
  console.log("New game created with ID", newGame.id);
};

io.on("connection", socket => {
  console.log("New client connected.");
  socket.join("lobby");
  socket.emit("listUpdate", Object.keys(games));

  socket.on("createGame", () => {
    createGame();
    socket.emit("listUpdate", Object.keys(games));
  });

  socket.on("requestJoinGame", gameId => {
    console.log("requestJoinGame msg received");
    if (games[gameId]) {
      socket.emit("gameState", games[gameId].getGameState());
    } else {
      /* TODO: more error handling, we should really think about how to execute this now */
      throw new Error("Tried to join a game that doesn't exist.");
    }
  });

  /* TODO: I think we should change all of these "data" objects to something more expressive */
  socket.on("executeMove", data => {
    games[data.id].executeMove(data.row, data.col, data.destRow, data.destCol);
    socket.emit("gameState", games[data.id].getGameState());
  });

  socket.on("reset", data => {
    games[data.id].reset();
    socket.emit("gameState", games[data.id].getGameState());
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
