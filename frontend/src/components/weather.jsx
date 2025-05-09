



import React, { useState, useEffect } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../redux/api/users";

const API_KEY = "27ef53c6f3064a12a867d3be213e206d"; 

function Weather() {
  const [weather, setWeather] = useState(null);
  
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, error, isLoading } = useGetUserProfileQuery(userInfo?._id); // Fetch user data from DB

  useEffect(() => {
    if (user && user.location) {
      fetchWeather(user.location); // Fetch weather for stored location
    }
  }, [user]);

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error(`Error fetching weather: ${data.message}`);
        return;
      }

      setWeather({
        name: data.name,
        temp: `${data.main.temp}°C`,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} km/h`,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="weather-card">
      {weather ? (
        <div className="weather-info">
          <h3 id="cityName">{weather.name}</h3>
          <img id="weatherIcon" src={weather.icon} alt="Weather Icon" />
          <h2 id="temperature">{weather.temp}</h2>
          <h3 id="cityName">Today</h3>
          <div className="details">
            <p>
              <img src="humidity.webp" alt="Humidity" style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
              <br />
              {weather.humidity} Humidity
            </p>
            <p>
              <img src="wind3.png" alt="Wind" style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
              <br />
              {weather.wind} Wind Speed
            </p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;






