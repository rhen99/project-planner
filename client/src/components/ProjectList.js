import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Project from "./Project";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function ProjectList({ projects, setProjects }) {
  const [success, setSuccess] = useState(null);

  const successAlert = !success ? null : (
    <Alert variant="success" className="my-2">
      {success}
    </Alert>
  );

  useEffect(() => {
    if (localStorage.getItem("success"))
      setSuccess(localStorage.getItem("success"));
    localStorage.removeItem("success");
  }, []);

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" exact />;
  } else {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Your Projects</h1>
            <div className="my-3">
              {successAlert}
              <Button as={Link} to="/add_project">
                Add Project
              </Button>
            </div>
            <Accordion>
              {projects.map((project, index) => (
                <Project
                  key={project._id}
                  project={project}
                  index={index}
                  setProjects={setProjects}
                  projects={projects}
                />
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProjectList;
