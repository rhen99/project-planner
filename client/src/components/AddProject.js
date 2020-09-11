import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function AddProject() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [step, setStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [error, setError] = useState(null);

  const errorAlert = !error ? null : <Alert variant="danger">{error}</Alert>;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    setError(null);
    e.preventDefault();
    if (!month || !day || !year)
      return setError("Please fill in all required fields.");

    setDeadline(`0${month}/0${day}/${year}`);
  };

  const addStep = () => setSteps([...steps, { step_name: step }]);
  return (
    <div className="my-3">
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        onExit={() => {
          setName(null);
          setDescription(null);
          setStep(null);
          setSteps([]);
          setDeadline(null);
          setDay(null);
          setMonth(null);
          setYear(null);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            {errorAlert}
            <Form.Group controlId="project_name">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Form.Control>
              <Form.Text className="text-muted">
                Enter your project name here.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="project_description">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
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
                <Form.Control
                  onChange={(e) => setStep(e.target.value)}
                  type="text"
                ></Form.Control>
                <Button variant="primary" onClick={addStep}>
                  Add
                </Button>
              </div>
              <Form.Text className="text-muted">
                Enter all the steps here.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Row>
                <Col>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    className="form-control"
                    placeholder="Month"
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    className="form-control"
                    placeholder="Day"
                    onChange={(e) => setDay(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    min={new Date().getFullYear()}
                    className="form-control"
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Col>
              </Form.Row>
              <Form.Text className="text-muted">
                Enter project deadline here.
              </Form.Text>
            </Form.Group>
          </Form>
          {/* <ListGroup>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
            <ListGroup.Item>Item</ListGroup.Item>
          </ListGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
