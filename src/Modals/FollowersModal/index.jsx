// MyModal.js

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Followings from '../../components/pages/Following';
import FollowersDetails from '../../components/pages/Followers/followerDetails';

function MyModal({ show, onHide }) {
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
          Followers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <FollowersDetails/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
