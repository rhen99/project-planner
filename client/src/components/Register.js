import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Register() {
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirm, setPasswordConfirm] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/register", {
        username,
        email,
        password,
        password_confirm,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              type="text"
            ></Form.Control>
            <Form.Text className="text-muted">
              Enter your username here.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
            ></Form.Control>
            <Form.Text className="text-muted">Enter your email here.</Form.Text>
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
          <Form.Group controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></Form.Control>
            <Form.Text className="text-muted">
              Re-Enter your password here.
            </Form.Text>
          </Form.Group>
          <Button as="input" type="submit" variant="primary" value="Register" />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
