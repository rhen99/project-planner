import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Project from "./Project";
import AddProject from "./AddProject";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ProjectList() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Your Projects</h1>

          <AddProject />
          <Accordion>
            <Project />
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectList;
