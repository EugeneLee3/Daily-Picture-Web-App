import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/navbar.css'

function Navbar() {
  return (
    <div>
      
      <nav className="navbar horizontal">
        <Link to="/" className="horizontal item">Home</Link>
        <Link to="/sign-in" className="horizontal item">Log In</Link>
        <Link to="/register" className="horizontal item">Sign Up</Link>
      </nav>

    </div>
  )
}

export default Navbar