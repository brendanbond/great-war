import React from "react";

function GameSquare(props) {
  return (
    <div className="col game-board-square" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default GameSquare;
