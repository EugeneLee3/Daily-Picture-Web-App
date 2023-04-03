import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import DailyImage from '../components/DailyImage';

import '../styles/home.css';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {localStorage.getItem('token') ? (
          <>

            <DailyImage />

          </>
        ) : (
          <div className='banner'>
            <span className='content'>
              <h1 className='title'>Hello!</h1>
              <h3 className='subtitle'>Enjoy Your Daily Pictures of Space.</h3>

              <button className='button'>
                <Link to='/sign-in'>Sign In</Link>
              </button>

              <button className='button'>
                <Link to='/register'>Register</Link>
              </button>
            </span>
          </div>
        )}
    </div>
  );
}

export default Home;
