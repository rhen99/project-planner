import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Progress from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddProject from "./AddProject";

function ProjectList() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <h1>Your Projects</h1>
      <AddProject />
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Project One
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h5>0% Done</h5>
              <Progress now="0" variant="success" className="mb-3" />
              <ListGroup>
                <ListGroup.Item>
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
                </ListGroup.Item>
                <ListGroup.Item>Item</ListGroup.Item>
                <ListGroup.Item>Item</ListGroup.Item>
                <ListGroup.Item>Item</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default ProjectList;
