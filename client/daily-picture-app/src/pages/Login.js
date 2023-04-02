import { React, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

function Login() {
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
    try {
      await axios.post('/sign-in', { email, password })
      // When making a request to a protected route, include the JWT in the Authorization header
      // axios.get('/', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      setError('');
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message);
      navigate('/sign-in'); // redirect to login page
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>

      {error && <p>Error: {error}</p>}

    </div>
  );
}

export default Login