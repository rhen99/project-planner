import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Project from "./Project";
import AddProject from "./AddProject";

function ProjectList() {
  return (
    <>
      <h1>Your Projects</h1>
      <AddProject />
      <Accordion>
        <Project />
      </Accordion>
    </>
  );
}

export default ProjectList;
