import { React, useState, useEffect } from 'react';
import moment from 'moment';

import '../styles/dailyImage.css';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

function DailyImage() {
  const [picture, setPicture] = useState(null);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [error, setError] = useState(true);
  const todayDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      );
      const data = await response.json();
      setPicture(data);
    };
    fetchData();
  }, [date]);

  const handlePrevDay = () => {
    setDate(moment(date).subtract(1, 'days').format('YYYY-MM-DD'));
    setError(false);
  };

  const handleNextDay = () => {
    if ( moment(date).add(1, 'days').format('YYYY-MM-DD') === moment(todayDate).format('YYYY-MM-DD') ) {
        setDate(todayDate);
        setError(true);
    } else {
        setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'));
        setError(false);
    }
  };

  const handleToday = () => {
    setDate(todayDate);
    setError(true);
  }

  if (!picture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className=''>{picture.title}</h1>
      <button onClick={handlePrevDay}>Previous Day</button>
      {!error && ( 
      <>
        <button onClick={handleNextDay}>Next Day</button>
        <button onClick={handleToday}>Today</button>
      </>
      )}
      <img src={picture.url} alt={picture.title} />
      <span className>
        {picture.explanation}
      </span>
    </div>
  );
}

export default DailyImage;
