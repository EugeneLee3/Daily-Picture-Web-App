import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DailyImage from '../components/DailyImage';


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
            <div>sign in!</div>
          </>
        )}
    </div>
  );
}

export default Home;
