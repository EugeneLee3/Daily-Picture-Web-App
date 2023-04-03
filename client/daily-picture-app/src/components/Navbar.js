import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';


import '../styles/navbar.css'

function Navbar() {
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
      <nav className="navbar horizontal">

        {localStorage.getItem('token') ? (
          <>
            <Link to="/">Home</Link>
            <Link to="sign-in" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/sign-in" onClick={handleLogin}>Log in</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}

      </nav>
    </>
  )
}

export default Navbar