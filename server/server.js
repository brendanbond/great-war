const express = require("express");
const http = require("http");
const morgan = require("morgan");
const socketIO = require("socket.io");

const engine = require("./engine");

const app = express();
const port = process.env.PORT || 5000;

/* TODO: we will likely need a game object for connections to the server while a game is in progress */
const game = {};

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected.");
  socket.emit("boardUpdate", engine.getBoardState());
  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
