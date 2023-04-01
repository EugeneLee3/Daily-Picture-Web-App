import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DailyImage from '../components/DailyImage';

function Home() {

  // const location = useLocation();

  return (
    <div>
        
        <DailyImage />

    </div>
  )
}

export default Home