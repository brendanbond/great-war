const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");
const {
  createGame,
  getGameList,
  getGameState,
  gameIsReadyToBegin,
  requestJoinGame,
  executeMove
} = require("./gameLayer");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  /* When the socket connects, it enters through the lobby */
  socket.join("lobby");
  io.to("lobby").emit("listUpdate", getGameList());

  /* From the lobby, socket can create a game... */
  socket.on("createGame", () => {
    createGame();
    io.to("lobby").emit("listUpdate", getGameList());
  });

  /* ...or receive info about a game it may want to join... */
  /* TODO: this might introduce some security issues, e.g. spoofing a socket id */
  socket.on("getGameState", ({ gameId }) => {
    io.to(`${socket.id}`).emit("gameState", getGameState(gameId));
  });

  /* ...or request to join a specific game. */
  socket.on("requestJoinGame", ({ gameId }) => {
    console.log(`Socket ${socket.id} has requested to join game ${gameId}.`);
    requestJoinGame(socket.id, gameId);
    socket.join(`${gameId}`).leave("lobby");
    io.to(`${gameId}`).emit("gameState", getGameState(gameId));
    if (gameIsReadyToBegin(gameId)) {
      io.to(`${gameId}`).emit("gameIsReadyToBegin");
    }
  });

  socket.on("executeMove", ({ gameId, row, col, destRow, destCol }) => {
    executeMove({ playerId: socket.id, gameId, row, col, destRow, destCol });
    io.to(`${gameId}`).emit("gameState", getGameState(gameId));
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected.`);
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
