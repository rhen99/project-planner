import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";

function Header({ isAuth }) {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const location = useLocation();

  const navlinks = {
    isAuth: (
      <Nav navbar="true" defaultActiveKey={location.pathname}>
        <Nav.Link eventKey="1" as={Link} to="#" onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav>
    ),
    notAuth: (
      <Nav navbar="true" defaultActiveKey={location.pathname}>
        <Nav.Link eventKey="/login" as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link eventKey="/register" as={Link} to="/register">
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
