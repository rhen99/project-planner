import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Progress from "react-bootstrap/ProgressBar";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import StepList from "./StepList";

function Project({ project }) {
  const [progress, setProgress] = useState(project.progress);
  const statusClassName =
    project.status === "Success"
      ? "text-success"
      : project.status === "Failed"
      ? "text-danger"
      : "text-warning";
  return (
    <Card>
      <AccordionToggle as={Card.Header} variant="link" eventKey={project._id}>
        {project.name}{" "}
        <span className={`float-right font-weight-bold ${statusClassName}`}>
          {project.status}
        </span>
      </AccordionToggle>
      <AccordionCollapse eventKey={project._id}>
        <Card.Body>
          <p>{project.description}</p>
          <h6>{Math.round(progress)}% Done</h6>
          <Progress now={progress} variant="success" className="mb-3" />
          <StepList
            steps={project.steps}
            setProgress={setProgress}
            projectId={project._id}
            status={project.status}
          />
        </Card.Body>
      </AccordionCollapse>
    </Card>
  );
}

export default Project;
