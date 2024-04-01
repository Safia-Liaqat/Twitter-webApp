// MyModal.js

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FollowingDetails from '../../components/pages/Following/FollowingDetails';

function FollowingModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Followings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <FollowingDetails/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowingModal;
