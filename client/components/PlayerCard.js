import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function PlayerCard({ player }) {
  return (
    <Card>
      <Card.Title>
        {player.user ? "Player " + player.user : "Waiting on player..."}
      </Card.Title>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            Captures:
            <span>
              {player
                ? player.captures.map(capture => {
                    return capture.symbol;
                  })
                : ""}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
