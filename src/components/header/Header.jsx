import { BiCameraMovie } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '20px'}}>
                <BiCameraMovie size={35}/>Movie DB
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto my-2 my-1g-0" style={{maxHeight: '100px'}}>
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header