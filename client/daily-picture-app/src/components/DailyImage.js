import { React, useState, useEffect } from 'react';
import moment from 'moment';

function DailyImage() {
  const [picture, setPicture] = useState(null);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

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
    setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'));
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
