import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

function AddProject() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="my-3">
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="project_name">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text"></Form.Control>
              <Form.Text className="text-muted">
                Enter your project name here.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="project_description">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                style={{
                  resize: "none",
                }}
              ></Form.Control>
              <Form.Text className="text-muted">
                Enter your project description here. (optional)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="add_step">
              <Form.Label>Add Step</Form.Label>
              <div className="d-flex">
                <Form.Control type="text"></Form.Control>
                <Button variant="primary">Add</Button>
              </div>
              <Form.Text className="text-muted">
                Enter your project description here. (optional)
              </Form.Text>
            </Form.Group>
          </Form>
          <ListGroup>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Submit Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
