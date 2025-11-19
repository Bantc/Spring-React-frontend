import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../api/axiosConfig";

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [loggedUser, setLoggedUser] = useState("");

const parseJwt = (token) => {
    if (!token || token.split(".").length !== 3) return null;

    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = parseJwt(token);
            if (decoded && decoded.sub) {
                setLoggedUser(decoded.sub);
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        }
    }, []);

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setError("");
    };

    const handleClose = () => {
        resetForm();
        setShowModal(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/api/auth/login", {
                username,
                password,
            });

            const token = res.data.token;
            localStorage.setItem("token", token);

            const decoded = parseJwt(token);
            setLoggedUser(decoded.sub);

            setIsLoggedIn(true);
            handleClose();
        } catch (err) {
            console.error(err);
            setError("Wrong login or password");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/api/auth/register", {
                username,
                password,
            });

            alert("Registration successful");
            setIsRegister(false);
            resetForm();
        } catch (err) {
            console.error(err);
            setError("Registration failed. Username already exists");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <>
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
                    <Nav className="ms-auto" style={{display:"flex", alignItems:"center", gap:"10px"}}>
                        {isLoggedIn && (
                            <span style={{color:"white"}}>Logged as {loggedUser}</span>
                        )}
                        {isLoggedIn ? (<Button variant="outline-light" onClick={handleLogout}>Logout</Button>)
                                    : (<Button variant="outline-light" onClick={() => setShowModal(true)}>Log in</Button>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="my-modal">
          <Modal.Title className="title" >{isRegister ? "Register" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isRegister ? handleRegister : handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <div className="text-danger mb-3">{error}</div>}

            <Button variant="primary" type="submit" className="w-100">{isRegister ? "Register" : "Login"}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="register">
            {isRegister ? 
                    (
                        <span>Already registered?{" "}
                            <Button variant="link" onClick={() => setIsRegister(false)}>Log in</Button>
                        </span>
                    )
                        :
                    (
                        <span>
                            Don't have an account?{" "}
                                <Button variant="link" onClick={() => setIsRegister(true)}>Register</Button>
                        </span>
                    )
            }
          </div>
        </Modal.Footer>
        </Modal>
      </>
    )
}

export default Header