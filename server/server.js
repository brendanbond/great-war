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
};

io.on("connection", socket => {
  socket.join("lobby");
  io.to("lobby").emit("listUpdate", Object.keys(games));

  socket.on("createGame", () => {
    createGame();
    io.to("lobby").emit("listUpdate", Object.keys(games));
  });

  socket.on("getGameState", ({ gameId }) => {
    console.log(
      `Received getGameState msg from ${socket.id} concerning game ${gameId}`
    );
    io.to(`${socket.id}`).emit("gameState", games[gameId].getGameState());
  });

  socket.on("requestJoinGame", ({ gameId }) => {
    if (games[gameId]) {
      socket.leave("lobby", error => {
        if (error) {
          throw new Error(error);
        } else {
          socket.join(gameId);
          io.to(gameId).emit("gameState", games[gameId].getGameState());
        }
      });
    } else {
      /* TODO: more error handling, we should really think about how to execute this now */
      throw new Error("Tried to join a game that doesn't exist.");
    }
  });

  socket.on("executeMove", moveData => {
    games[moveData.id].executeMove(moveData);
    io.emit("gameState", games[moveData.id].getGameState());
  });

  socket.on("reset", data => {
    games[data.id].reset();
    io.emit("gameState", games[data.id].getGameState());
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
