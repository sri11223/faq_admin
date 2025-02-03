import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaHome, FaQuestionCircle, FaUser, FaCog } from 'react-icons/fa';
import '../styles/Navbar.css'; // Custom CSS for styling

const NavbarEle = () => {
  return (
    <Navbar expand="lg" className="custom-navbar shadow">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="fw-bold text-white">
          <FaQuestionCircle className="me-2" />
          FAQ Admin
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="custom-nav-link">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            
            <Nav.Link href="/admin" className="custom-nav-link">
              <FaUser className="me-1" /> Admin Panel
            </Nav.Link>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarEle;
