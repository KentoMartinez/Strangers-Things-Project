import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export default function NavbarPlayers() {
  const navigate = useNavigate();

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
    >
      <Container>
        <Navbar.Brand >Stranger Things</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/login");
            }}
          >
            New Post
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/posts");
            }}
          >
            Posts
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
