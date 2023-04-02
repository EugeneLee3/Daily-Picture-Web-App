import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    try {
      await axios.post('/register', { email, password });
      setError('');
      navigate('/sign-in');
    } catch (error) {
      setError(error.response.data.message); // set error state to the error message returned by the server
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
      
      {error && <p>Error: {error}</p>}

    </div>
  );
}


export default Register