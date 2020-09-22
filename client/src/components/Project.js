import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Progress from "react-bootstrap/ProgressBar";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import StepList from "./StepList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Project({ project, projects, index, setProjects }) {
  const [progress, setProgress] = useState(project.progress);
  const [timer, setTimer] = useState(null);
  const [show, setShow] = useState(false);
  const statusClassName =
    project.status === "Success"
      ? "text-success"
      : project.status === "Failed"
      ? "text-danger"
      : "text-warning";
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const deleteProject = () => {
    axios
      .delete(`/api/projects/${project._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        setShow(false);
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
      })
      .catch((err) => {
        console.log(err.response.msg);
      });
  };
  const countDownTimer = () => {
    const countDownDate = new Date(project.deadline).getTime();

    let timer;

    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timer = `${days < 10 ? "0" + days : days}d ${
        hours < 10 ? "0" + hours : hours
      }h ${minutes < 10 ? "0" + minutes : minutes}m ${
        seconds < 10 ? "0" + seconds : seconds
      }s`;
      setTimer(timer);
      if (distance < 0) {
        clearInterval(interval);
        setTimer("00d 00h 00m 00s");
      }
    }, 1000);
  };
  useEffect(() => {
    countDownTimer();
  }, []);
  return (
    <Card>
      <AccordionToggle as={Card.Header} variant="link" eventKey={project._id}>
        {project.name}{" "}
        <a
          className="float-right ml-3 text-danger"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          Delete
        </a>
        <span className={`float-right font-weight-bold ${statusClassName}`}>
          {project.status}
        </span>
      </AccordionToggle>
      <AccordionCollapse eventKey={project._id}>
        <Card.Body>
          <p>{project.description}</p>
          <p>
            <span className="font-weight-bold">Time Left</span>: {timer}
          </p>
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        animation={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>Are your sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteProject}>
            Yes
          </Button>
          <Button onClick={handleClose} variant="danger">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default Project;
