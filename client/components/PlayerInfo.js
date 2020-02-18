import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayerCard from "./PlayerCard";

function PlayerInfo({ gameState }) {
  return (
    <Container>
      <Row>
        <Col sm>
          <PlayerCard player={gameState.white}></PlayerCard>
        </Col>
        <Col sm>
          <PlayerCard player={gameState.black}></PlayerCard>
        </Col>
      </Row>
    </Container>
  );
}

export default PlayerInfo;
