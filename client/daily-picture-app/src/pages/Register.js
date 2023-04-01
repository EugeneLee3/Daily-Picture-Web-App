import { React, useState } from 'react';
import axios from 'axios';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission herez
    console.log(email, password)
    try {
      const response = await axios.post('/', { email, password });
      console.log(response.data);
      // do something based on the response
    } catch (error) {
      console.error(error);
      // handle error
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
    </div>
  );
}


export default Register