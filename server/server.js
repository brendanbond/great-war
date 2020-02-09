const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");

const Game = require("../game/Game");

const app = express();
const port = process.env.PORT || 5000;

/* TODO: we will likely need an array of game objects to support multiple concurrent games */
let game = new Game();

app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected.");

  socket.emit("boardUpdate", game.getBoardState());

  socket.on("executeMove", data => {
    game.executeMove(data.row, data.col, data.destRow, data.destCol);
    socket.emit("boardUpdate", game.getBoardState());
  });

  socket.on("reset", () => {
    game.reset();
    socket.emit("boardUpdate", game.getBoardState());
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
