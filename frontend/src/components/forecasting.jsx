


import React, { useState, useEffect } from "react";
import "../styles.css";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../redux/api/users";
import { toPadding } from "chart.js/helpers";

const API_KEY = "27ef53c6f3064a12a867d3be213e206d";

function ForecastWeather() {
  const [forecast, setForecast] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user } = useGetUserProfileQuery(userInfo?._id);

  useEffect(() => {
    if (user && user.location) {
      fetchForecast(user.location);
    }
  }, [user]);

  const fetchForecast = async (city) => {
    try {
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.coord) {
        console.error("Error fetching city coordinates.");
        return;
      }

      const { lat, lon } = geoData.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const response = await fetch(forecastUrl);
      const data = await response.json();

      if (data.cod !== "200") {
        console.error("Error fetching forecast:", data.message);
        return;
      }

      const today = new Date().getDate();
      const nextDays = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .filter((item) => new Date(item.dt * 1000).getDate() !== today)
        .slice(0, 4);

      setForecast(nextDays);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div className="forecast-container">
      <h3>4-Days Forecast</h3>
      <div className="forecast">
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather Icon" />
              <h2>{day.main.temp}°C</h2>
              <h3>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</h3>

              <div className="details">
                <p>
                  <img src="humidity.webp" alt="Humidity" className="icon" />
                  <br />
                  {day.main.humidity}% Humidity
                </p>
                <p>
                  <img src="wind3.png" alt="Wind" className="icon" />
                  <br />
                  {day.wind.speed} km/h Wind Speed
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading forecast data...</p>
        )}
      </div>
    </div>
  );
}

export default ForecastWeather;

