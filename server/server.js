const express = require("express");
const http = require("http");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

/* TODO: we will likely need a game object for connections to the server while a game is in progress */
const game = {};

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected.");
  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});
