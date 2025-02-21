import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=3dc2d934457a47636eeb593b4018fd5b&units=metric`
        );
        
        setWeatherData(response.data);
        setError('');
      } catch (err) {
        setError('City not found. Please try again.');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setCity(formData.get('city'));
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="city"
          placeholder="Enter city name"
          aria-label="City name"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="temperature">
              {Math.round(weatherData.main.temp)}°C
            </div>
          </div>
          <div className="weather-details">
            <p>Conditions: {weatherData.weather[0].main}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;