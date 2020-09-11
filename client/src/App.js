import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [projects]);
  return (
    <>
      {console.log(user)}
      <Header></Header>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="6">
            <Login />
            {/* <Register /> */}
          </Col>
        </Row>
        {/* <Row className="mt-5">
          <Col>
            <ProjectList />
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default App;
