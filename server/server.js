const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");
const {
  createGame,
  getGameList,
  getGameState,
  addPlayerToGame,
  gameIsReadyToBegin,
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
  /* When the socket connects, it enters through the lobby and its id is assigned to a Player */
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
    let gameToJoin = getGameState(gameId);
    if (!gameToJoin) {
      io.to(`${socket.id}`).emit("gameDoesNotExist", { gameId });
    }

    if (gameToJoin.inProgress) {
      io.to(`${socket.id}`).emit("gameIsInProgress", { gameId });
    }

    if (gameToJoin.players.length >= 2) {
      throw new Error(
        `Socket ${socket.id} tried to join a game that is full but not yet in progress.`
      );
    }

    addPlayerToGame(socket.id, gameId);
    socket.leave("lobby").join(`${gameId}`);
    if (gameIsReadyToBegin(gameId)) {
      io.to(`${gameId}`).emit("gameIsReadyToBegin");
    }
  });

  socket.on("executeMove", ({ gameId, row, col, destRow, destCol }) => {
    executeMove({ gameId, row, col, destRow, destCol });
    io.to(`${gameId}`).emit("gameState", getGameState(gameId));
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
