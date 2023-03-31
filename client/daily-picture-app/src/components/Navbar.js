import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/sign-in">Log In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </nav>

    </div>
  )
}

export default Navbar