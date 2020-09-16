import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Project from "./Project";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function ProjectList() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Your Projects</h1>
          <div className="my-3">
            <Button as={Link} to="/add_project">
              Add Project
            </Button>
          </div>
          <Accordion>
            <Project />
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectList;
