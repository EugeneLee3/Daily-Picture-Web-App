import { React, useState, useEffect } from 'react';
import moment from 'moment';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

function DailyImage() {
  const [picture, setPicture] = useState(null);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
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
  };

  const handleNextDay = () => {
    if ( moment(date).add(1, 'days').format('YYYY-MM-DD') === moment(todayDate).add(1, 'days').format('YYYY-MM-DD') ) {
        setDate(todayDate);
        console.log('Sorry, we cannot go into the future!');
    } else {
        setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'));
    }
  };

  if (!picture) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{picture.title}</h1>
      <img src={picture.url} alt={picture.title} />
      <p>{picture.explanation}</p>
      <button onClick={handlePrevDay}>Previous Day</button>
      <button onClick={handleNextDay}>Next Day</button>
    </div>
  );
}

export default DailyImage;
