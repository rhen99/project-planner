import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import { Redirect, Link } from "react-router-dom";

function AddProject({ setProjects, projects }) {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("");
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const errorAlert = !error ? null : <Alert variant="danger">{error}</Alert>;

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    axios
      .post(
        "/api/projects/create",
        { name, description, steps },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setProjects([...projects, res.data.project]);
        localStorage.setItem("success", res.data.msg);
        setRedirect(true);
      })
      .catch((err) => setError(err.response.data.msg));
  };
  const addStep = (e) => {
    e.preventDefault();
    if (!step) return false;
    setSteps([...steps, { step_name: step }]);
    setStep("");
  };
  const removeStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };
  if (redirect) {
    return <Redirect to="/" exact />;
  } else if (!localStorage.getItem("token")) {
    return <Redirect to="/login" exact />;
  } else {
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="8">
            <h1>Add Form</h1>
            <Button variant="secondary" as={Link} to="/">
              Cancel
            </Button>
            <Form className="my-3" onSubmit={handleSubmit}>
              {errorAlert}
              <Form.Group controlId="project_name">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                ></Form.Control>
                <Form.Text className="text-muted">
                  Enter your project name here. (required)
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="project_description">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                  rows="6"
                  style={{
                    resize: "none",
                  }}
                  value={description}
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
                    value={step}
                  ></Form.Control>
                  <Button variant="primary" onClick={addStep}>
                    Add
                  </Button>
                </div>
                <ListGroup className="mt-3">
                  {steps.map((step, index) => (
                    <ListGroup.Item key={index}>
                      {step.step_name}{" "}
                      <Button
                        onClick={() => removeStep(index)}
                        variant="danger"
                        size="sm"
                        className="float-right"
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Form.Text className="text-muted">
                  Enter all the steps here. (required)
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                value="Submit Project"
                type="submit"
                as="input"
                block
              />
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddProject;
