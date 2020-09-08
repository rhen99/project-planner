import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Login() {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Text className="text-muted">
              Enter your username here.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"></Form.Control>
            <Form.Text className="text-muted">
              Enter your password here.
            </Form.Text>
          </Form.Group>
          <Button as="input" type="submit" variant="primary" value="Login" />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
