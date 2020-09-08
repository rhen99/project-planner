import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <>
      <Header></Header>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="6">
            {/* <Login /> */}
            <Register />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
