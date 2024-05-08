import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const api = {
    key: "b259ddc16eb2600509d396d2d5f1bfc6",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState();

  useEffect(() => {
    if (weather !== null) {
      // Map weather conditions to corresponding background images
      const weatherBackgrounds = {
        Clear: 'https://source.unsplash.com/1600x900/?sunny', 
        Clouds: 'https://source.unsplash.com/1600x900/?cloudy', 
        Rain: 'https://source.unsplash.com/1600x900/?rain', 
        Snow: 'https://source.unsplash.com/1600x900/?snow', 
        Thunderstorm: 'https://source.unsplash.com/1600x900/?thunderstorm', 
        Mist: 'https://source.unsplash.com/1600x900/?mist', 
      };

      // Set the background image based on the weather condition
      const condition = weather.weather[0].main;
      setBackgroundImage(weatherBackgrounds[condition]);
    }
  }, [weather]);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
       setWeather(result);
      });
  };

  return (
    <div className='App' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className='App-header'>
        <h1 className='weather-app-title'>weather app</h1>
        <div>
          <input
            type='text'
            placeholder='search city'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        
        {weather !== null && ( // Conditional rendering based on weather
          <div>
            <p>{weather.name}</p>
            <p><b className='style'>Temperature:&nbsp;</b>{weather.main.temp}</p>
            <div>
              <p><b className='style'>Weather:</b> {weather.weather[0].main} 
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" className="weather-icon" />
              </p>
              <p>({weather.weather[0].description})</p>
              <p><b className='style'>Wind Speed: </b>{weather.wind.speed} m/s</p>
              <p><b className='style'>Wind Direction: </b>{weather.wind.deg}°</p> 
            </div>
            {weatherImage && <img src={weatherImage} alt="Weather" className="weather-image" />}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
