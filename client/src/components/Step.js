import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Alert from "react-bootstrap/Alert";

function Step() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <ListGroupItem>
      <div
        className="d-flex"
        style={{
          width: "100%",
        }}
      >
        <h6
          style={{
            flex: 1,
          }}
        >
          Step Name
        </h6>
        <Button variant="primary" onClick={handleShow}>
          Clear Step
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="description">
              <Form.Label>Describe Step</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                style={{
                  resize: "none",
                }}
              ></Form.Control>
              <Form.Text className="text-muted">
                Describe what you've done and/or achieved so far.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Submit Step</Button>
        </Modal.Footer>
      </Modal>
    </ListGroupItem>
  );
}

export default Step;
