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
            {/* <h1>Hello, {user}!</h1> */}

            <DailyImage />

          </>
        ) : (
          <>
            <>
              <h1 className=''>Hello!</h1>
              <h3 className=''>Enjoy Your Daily Pictures of Space.</h3>
              <h5 className=''>To Continue Please Log In or Register.</h5>

              <button>
                <Link to='/sign-in'>Sign In</Link>
              </button>

              <button>
                <Link to='/register'>Register</Link>
              </button>
            </>
          </>
        )}
    </div>
  );
}

export default Home;
