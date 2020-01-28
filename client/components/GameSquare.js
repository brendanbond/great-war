import React from "react";

function GameSquare(props) {
  return (
    <div
      className={"col game-board-square " + (props.selected ? "selected" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}

export default GameSquare;
