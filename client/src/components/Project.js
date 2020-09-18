import React from "react";
import Card from "react-bootstrap/Card";
import Progress from "react-bootstrap/ProgressBar";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import StepList from "./StepList";

function Project({ project }) {
  return (
    <Card>
      <AccordionToggle as={Card.Header} variant="link" eventKey={project._id}>
        {project.name} <span className="float-right">{project.status}</span>
      </AccordionToggle>
      <AccordionCollapse eventKey={project._id}>
        <Card.Body>
          <h5>{Math.round(project.progress)}% Done</h5>
          <Progress now={project.progress} variant="success" className="mb-3" />
          <StepList steps={project.steps} projectId={project._id} />
        </Card.Body>
      </AccordionCollapse>
    </Card>
  );
}

export default Project;
