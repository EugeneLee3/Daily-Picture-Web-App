import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/login.css';


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
      await axios.post('https://daily-picture-web-app.vercel.app/register', { email, password });
      setError('');
      navigate('/sign-in');
    } catch (error) {
      setError(error.response.data.message); // set error state to the error message returned by the server
    }
  };

  return (
    <>
      <h1 className='title'>Register</h1>

      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          {error && <p>Error: {error}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>        
    </>
  
  );
}


export default Register