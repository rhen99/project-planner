import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Login() {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/" exact />;
  } else {
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="6">
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                      Enter your username here.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                      Enter your password here.
                    </Form.Text>
                  </Form.Group>
                  <Button
                    as="input"
                    type="submit"
                    variant="primary"
                    value="Login"
                  />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
