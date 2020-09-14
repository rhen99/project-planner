import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Header({ isAuth }) {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navlinks = {
    isAuth: (
      <Nav navbar="true">
        <Nav.Link eventKey="1" as={Link} to="#" onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav>
    ),
    notAuth: (
      <Nav navbar="true">
        <Nav.Link eventKey="1" as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link eventKey="2" as={Link} to="/register">
          Register
        </Nav.Link>
      </Nav>
    ),
  };
  return (
    <Navbar expand="lg" variant="dark" bg="primary">
      <Container>
        <Navbar.Brand>Progress Tracker</Navbar.Brand>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Collapse className="justify-content-end">
          {isAuth ? navlinks.isAuth : navlinks.notAuth}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
