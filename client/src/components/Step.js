import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import moment from "moment";

function Step({ step, projectId, index }) {
  const [show, setShow] = useState(false);
  const [shortDesc, setShortDesc] = useState(step.short_description);
  const [stepProp, setStepProp] = useState(step);
  const [date, setDate] = useState(
    moment(step.date).format("MM/DD/YY hh:mm a")
  );
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
        setShow(false);
        setStepProp({ ...stepProp, completed: 1 });
        setDate(moment(Date.now()).format("MM/DD/YY hh:mm a"));
      })
      .catch((err) => setError(err.response.data.msg));
    setShow(false);
    setStepProp({ ...stepProp, completed: 1 });
  };
  const handleClose = () => setShow(false);

  const errorAlert = !error ? null : <Alert variant="danger">{error}</Alert>;
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
        {stepProp.completed === 0 ? (
          <Button
            className="float-right"
            variant="success"
            size="sm"
            onClick={handleShow}
          >
            Clear Step
          </Button>
        ) : (
          <Alert variant="success">
            <h6>Step Cleared - {date}</h6>
            <p>{shortDesc}</p>
          </Alert>
        )}
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
}

export default Step;
