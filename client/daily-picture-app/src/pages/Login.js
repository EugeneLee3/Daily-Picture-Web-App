import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/login.css';

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/sign-in', { email, password })
      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    const id_token = response.tokenId;
    axios.post('/google-signin', { id_token })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(error => {
        console.log(error.response.data.message)
        setError(error.response.data.message);
      });
  }

  return (
      <>
        <h1 className='title'>Sign In</h1>

        <Form className='form' onSubmit={handleLogin}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>

          <Form.Text className="text-muted">
            {error && <p>Error: {error}</p>}
          </Form.Text>

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <GoogleLogin
            clientId = { process.env.REACT_APP_GOOGLE_CLIENT_ID }
            onSuccess = { responseGoogle }
            onFailure = { responseGoogle }
            cookiePolicy = { 'single_host_origin' }
          />   
          
        </Form>     
    </>
  );
}

export default Login;
