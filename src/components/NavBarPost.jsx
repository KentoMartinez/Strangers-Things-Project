import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

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
        <Navbar.Brand>Stranger Things</Navbar.Brand>
        <Nav className="d-flex justify-content-between align-items-center">
          <Nav.Link
            onClick={() => {
              navigate("/createpost");
            }}
          >
            New Post
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/posts");
            }}
          >
            All Posts
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Nav.Link>

        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as : </Navbar.Text>
          <NavDropdown
            title={" "+localStorage.getItem("username")}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
