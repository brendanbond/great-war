const express = require("express");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log("Server up and listening on port " + port);
});
