import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../styles/navbar.css';


function NavigationBar() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      navigate('/sign-in');
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  const handleLogout = () => {
    navigate('/sign-in');
    localStorage.removeItem('token');
  };


  return (
    <>
      <nav className="">

        {localStorage.getItem('token') ? (
          <>
            <Navbar bg="light" expand="lg">

              <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link>
                      <Link to="/">Home</Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to="/sign-in" onClick={handleLogout}>Logout</Link>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>

              </Container>
            </Navbar>
          </>
        ) : (
          <>
            <Navbar bg="light" expand="lg">
              <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <Nav.Link>
                      <Link to="/">Home</Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to="/sign-in" onClick={handleLogin}>Log in</Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to="/register">Sign Up</Link>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>

              </Container>
            </Navbar>
          </>
        )}

      </nav>
    </>
  )
}

export default NavigationBar