import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import '../styles/navbar.css'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    // send a request to your backend to log the user out
    // set isLoggedIn state to false
    setIsLoggedIn(false);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    // Handle form submission here

    //make request to backend to see if user is logged in
    navigate('/sign-in');
    await axios.get('/sign-in').then(response => {
      if (response.data.authenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
    .catch(error => {
      console.error("HI");
    });
  };


  return (
    <div>
      
      <nav className="navbar horizontal">

        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout}>Sign out</button>
        ) : (
          <Link to="/sign-in" onClick={handleLogin}>Log in</Link>
        )}

        <Link to="/register">Sign Up</Link>

      </nav>

    </div>
    
  )
}

export default Navbar