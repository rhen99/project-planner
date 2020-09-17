import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Step from "./Step";

function StepList({ steps, projectId }) {
  return (
    <ListGroup>
      {steps.map((step, index) => (
        <Step step={step} key={step._id} projectId={projectId} index={index} />
      ))}
    </ListGroup>
  );
}

export default StepList;
