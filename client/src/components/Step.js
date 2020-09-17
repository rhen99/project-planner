import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function Step({ step, projectId, index }) {
  const [show, setShow] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [isCompleted, setIsCompleted] = useState(step.completed);
  const [error, setError] = useState(null);

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/api/projects/${projectId}&${index}`,
        { short_description: shortDesc },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setIsCompleted(true);
        setShow(false);
      })
      .catch((err) => setError(err.response.data.msg));
  };
  const handleClose = () => setShow(false);

  const errorAlert = !error ? null : <Alert variant="danger">{error}</Alert>;
  if (!step.completed || !isCompleted)
    return (
      <ListGroupItem>
        <div>
          <h6
            style={{
              display: "inline-block",
            }}
          >
            {step.step_name}
          </h6>
          <Button
            className="float-right"
            variant="success"
            size="sm"
            onClick={handleShow}
          >
            Clear Step
          </Button>
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {errorAlert}
              <Form.Group controlId="description">
                <Form.Label>Describe Step</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  style={{
                    resize: "none",
                  }}
                  onChange={(e) => setShortDesc(e.target.value)}
                  value={shortDesc}
                ></Form.Control>
                <Form.Text className="text-muted">
                  Describe what you've done and/or achieved so far.
                </Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                as="input"
                type="submit"
                value="Submit Step"
              />
            </Form>
          </Modal.Body>
        </Modal>
      </ListGroupItem>
    );
  return (
    <ListGroupItem>
      <div>
        <h6
          style={{
            display: "inline-block",
          }}
        >
          {step.step_name}
        </h6>
        <Alert variant="success">{step.short_description}</Alert>
      </div>
    </ListGroupItem>
  );
}

export default Step;
