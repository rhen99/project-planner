import React, { useState, useEffect } from "react";
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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [hour, setHour] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAMPM] = useState("am");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);

  const errorAlert = !error ? null : <Alert variant="danger">{error}</Alert>;

  const handleDeadline = () => {
    const date = [month, day, year];
    const time = [hour, minutes];

    const zeroesOnDate = date
      .map((num) => {
        if (parseInt(num) < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      })
      .join("/");

    const zeroesOnTime = time
      .map((num) => {
        if (parseInt(num) < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      })
      .join(":");
    setDeadline(`${zeroesOnDate} ${zeroesOnTime} ${ampm}`);
  };
  useEffect(() => {
    handleDeadline();
  }, [month, day, year, hour, minutes, ampm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    axios
      .post(
        "/api/projects/create",
        { name, description, steps, deadline },
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
                      value={month < 10 ? `0${month}` : month}
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
                      value={day < 10 ? `0${day}` : day}
                    />
                  </Col>
                  <Col>
                    <input
                      type="number"
                      min={new Date().getFullYear()}
                      className="form-control"
                      placeholder="Year"
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mt-3">
                  <Col>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={hour < 10 ? `0${hour}` : hour}
                      className="form-control"
                      placeholder="Hour"
                      onChange={(e) => setHour(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes < 10 ? `0${minutes}` : minutes}
                      className="form-control"
                      placeholder="Minutes"
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      onChange={(e) => setAMPM(e.target.value)}
                    >
                      <option value="am" defaultValue>
                        AM
                      </option>
                      <option value="pm">PM</option>
                    </Form.Control>
                  </Col>
                </Form.Row>
                <Form.Text className="text-muted">
                  Enter project deadline here. (required)
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
