import React, { useState, useEffect, useCallback } from "react";
import scss from "./weatherCard.module.scss";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useCities } from "../../../context/CitiesProvider";
import { useAuth } from "../../../context/AuthContext";

import { RotatingLines } from "react-loader-spinner";

import { getCustomIcon } from "../WeatherIcon";
import { RotateCw, Trash2 } from "lucide-react";

function Loader() {
  return (
    <RotatingLines
      visible={true}
      height="66"
      width="66"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass="rotatingLines"
    />
  );
}

export default function WeatherCard({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { removeCity } = useCities();
  const { selectedCity, setSelectedCity, forceRefresh, isDashboardOpen, setIsDashboardOpen } = useCities();

  const { currentUser } = useAuth();

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${baseUrl}weather`, {
        params: {
          q: cityName,
          appid: apiKey,
          units: "metric",
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      toast.error(
        `An error occurred while fetching weather data for ${cityName}, (${err.message})`,
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
    } finally {
      setIsLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (isLoading) {
    return (
      <div className={scss.card}>
        <div className={scss.loaderWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  // const d = new Date();
  // const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  // const targetTime = new Date(utc + 1000 * weatherData.timezone);

  // const timeString = targetTime.toLocaleTimeString("en-GB", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const dateString = targetTime
  //   .toLocaleDateString("en-GB", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   })
  //   .replace(/\//g, ".");

  // const dayName = targetTime.toLocaleDateString("en-GB", { weekday: "long" });

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const fullCountryName = regionNames.of(weatherData.sys.country);

  const iconCode = weatherData.weather[0].icon;

  const isActiveAndOpen = selectedCity === cityName && isDashboardOpen;

  const handleSeeMore = () => {
    if (!currentUser) {
      toast.warn(`Log in to see more details!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (isActiveAndOpen) {
      setIsDashboardOpen(false);
    } else {
      setSelectedCity(cityName);
      setIsDashboardOpen(true);

      setTimeout(() => {
        const dashboardElement = document.getElementById("dashboard");
        if (dashboardElement) {
          dashboardElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className={scss.card}>
      <div className={scss.main}>
        <div className={scss.cardHeader}>
          <div className={scss.location}>
            <span className={scss.city}> {weatherData.name} </span>
            <span className={scss.country}>{fullCountryName}</span>
          </div>
          <div
            className={scss.iconWrapper}
            data-tooltip={weatherData.weather[0].description}
          >
            {getCustomIcon(iconCode, scss.cardIcons)}
          </div>
        </div>
        <div className={scss.temperatureWrapper}>
          <span className={scss.temperature}>
            {Math.round(weatherData.main.temp)}°
          </span>
        </div>
      </div>
      <div className={scss.footer}>
        <button className={scss.btnSeeMore} onClick={() => handleSeeMore()}>
          {isActiveAndOpen ? "See less" : "See more"}
        </button>
        <button
          className={scss.btnRefresh}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCity(cityName);
            fetchWeather();
            forceRefresh();
          }}
        >
          <RotateCw color="#E5E2E1" className={scss.btnRefreshIcon} />
        </button>
        <button className={scss.btnRemove} onClick={() => removeCity(cityName)}>
          <Trash2 color="#FFB4AB" className={scss.btnRemoveIcon} />
        </button>
      </div>
    </div>
  );
}
