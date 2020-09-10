import React from "react";
import Card from "react-bootstrap/Card";
import Progress from "react-bootstrap/ProgressBar";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import StepList from "./StepList";

function Project() {
  return (
    <Card>
      <AccordionToggle as={Card.Header} variant="link" eventKey="0">
        Project One
      </AccordionToggle>
      <AccordionCollapse eventKey="0">
        <Card.Body>
          <h5>0% Done</h5>
          <Progress now="0" variant="success" className="mb-3" />
          <StepList />
        </Card.Body>
      </AccordionCollapse>
    </Card>
  );
}

export default Project;
