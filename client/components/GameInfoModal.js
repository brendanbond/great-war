import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

/* TODO: we need to implement our own modal because BootStrap is pissing me off */
function GameInfoModal({ show, onHide, gameState }) {
  return gameState ? (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="game-info-modal-title">
          Game #{gameState.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  ) : (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      Loading...
    </Modal>
  );
}

GameInfoModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  gameId: PropTypes.string,
  gameState: PropTypes.object
};

export default GameInfoModal;
