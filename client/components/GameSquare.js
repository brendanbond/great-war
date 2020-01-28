import React from "react";

function GameSquare(props) {
  return (
    <div
      className={
        "col game-board-square " +
        (props.selected ? "selected " : "") +
        (props.highlighted ? "highlighted " : "")
      }
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}

export default GameSquare;
