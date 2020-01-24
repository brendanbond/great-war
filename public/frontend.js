$(document).ready(() => {
  const socket = io();
  let board = [];

  socket.on("stateUpdate", data => {
    board = data;
    $("#root").append("<p>" + board + "</p>");
  });
});
