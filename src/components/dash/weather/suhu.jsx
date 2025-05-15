import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suhu = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://dataonline.bmkg.go.id/home?language=english',
          { mode: 'no-cors' }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Prakiraan Cuaca Malang</h2>
          <p>Suhu: {weatherData.suhu}°C</p>
          <p>Kelembapan: {weatherData.kelembapan}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Suhu;
