const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");

const Game = require("./Game");

const app = express();
const port = process.env.PORT || 5000;

/* TODO: we will likely need an array of game objects to support multiple concurrent games */
const game = new Game();

app.use(morgan("dev"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected.");
  socket.emit("boardUpdate", game.board);

  // socket.on("getActions", position => {
  //   socket.emit(
  //     "actions",
  //     game.getActions(
  //       game.board[position[0]][position[1]],
  //       position[0],
  //       position[1]
  //     )
  //   );
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
