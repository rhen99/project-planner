import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Step from "./Step";

function StepList({ steps, projectId, setProgress, status }) {
  const completed = steps.filter((step) => step.completed !== 0);
  const stepsLength = steps.length;
  return (
    <ListGroup>
      {steps.map((step, index) => (
        <Step
          step={step}
          key={step._id}
          projectId={projectId}
          index={index}
          setProgress={setProgress}
          completed={completed}
          stepsLength={stepsLength}
          status={status}
        />
      ))}
    </ListGroup>
  );
}

export default StepList;
