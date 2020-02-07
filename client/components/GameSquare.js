import React from "react";
import PropTypes from "prop-types";

function GameSquare(props) {
  return (
    <div
      className={
        "col game-board-square " +
        (props.selected ? "selected " : "") +
        (props.highlighted ? "highlighted " : "") +
        (props.colored ? "colored " : "")
      }
      onClick={props.onClick}
    >
      {props.symbol}
    </div>
  );
}

GameSquare.propTypes = {
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
  colored: PropTypes.number,
  onClick: PropTypes.func,
  symbol: PropTypes.string
};

export default GameSquare;
