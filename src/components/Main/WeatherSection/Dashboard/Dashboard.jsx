import React, { useState, useEffect } from "react";
import scss from "./dashboard.module.scss";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useCities } from "../../../context/CitiesProvider";
import { useAuth } from "../../../context/AuthContext";

import Conditions from "./Conditions/Conditions";
import DayForecast from "./DayForecast/DayForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const { selectedCity, lastUpdate } = useCities();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(`${baseUrl}weather`, {
            params: { q: selectedCity, appid: apiKey, units: "metric" },
          }),
          axios.get(`${baseUrl}forecast`, {
            params: { q: selectedCity, appid: apiKey, units: "metric" },
          }),
        ]);

        setWeatherData(currentResponse.data);
        setForecastData(forecastResponse.data);
      } catch (err) {
        toast.error(
          `An error occurred while fetching weather data for ${selectedCity}, (${err.message})`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          },
        );
      }
    };

    fetchWeather();
  }, [selectedCity, lastUpdate]);

  if (!currentUser) return;

  return (
    <section id="dashboard" className={scss.dashboard} data-aos="fade-up">
      <div className={scss.mainContent}>
        <Conditions data={weatherData} />
        <HourlyForecast data={forecastData} />
        <DayForecast data={forecastData} />
      </div>
    </section>
  );
}
