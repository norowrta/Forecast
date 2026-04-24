import React from "react";
import { getCustomIcon } from "../../WeatherIcon";
import scss from "./dayForecast.module.scss";

function TemperatureBar({ dayMin, dayMax, weekMin, weekMax }) {
  const totalRange = weekMax - weekMin || 1;

  const leftPercent = ((dayMin - weekMin) / totalRange) * 100;
  const widthPercent = ((dayMax - dayMin) / totalRange) * 100;

  return (
    <div className={scss.barTrack}>
      <div
        className={scss.barFill}
        style={{
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
        }}
      ></div>
    </div>
  );
}

export default function DayForecast({ data }) {
  if (!data || !data.list) return null;

  const dailyData = {};

  data.list.forEach((item) => {
    const dateText = item.dt_txt.split(" ")[0];

    if (!dailyData[dateText]) {
      dailyData[dateText] = {
        date: new Date(item.dt_txt),
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    } else {
      dailyData[dateText].min = Math.min(
        dailyData[dateText].min,
        item.main.temp_min,
      );
      dailyData[dateText].max = Math.max(
        dailyData[dateText].max,
        item.main.temp_max,
      );

      if (item.dt_txt.includes("12:00:00")) {
        dailyData[dateText].icon = item.weather[0].icon;
        dailyData[dateText].description = item.weather[0].description;
      }
    }
  });

  const forecastArray = Object.values(dailyData).slice(0, 5);

  const weekMin = Math.min(...forecastArray.map((day) => day.min));
  const weekMax = Math.max(...forecastArray.map((day) => day.max));

  const getDayName = (date, index) => {
    if (index === 0) return "Today";
    return date.toLocaleDateString("en-GB", { weekday: "short" });
  };

  return (
    <div className={scss.dayForecast} data-aos="fade-up">
      <h3 className={scss.title}>5-Day Forecast</h3>

      <div className={scss.forecastList}>
        {forecastArray.map((day, index) => (
          <div className={scss.row} key={index}>
            <span className={scss.dayName}>{getDayName(day.date, index)}</span>

            <div className={scss.iconWrapper} data-tooltip={day.description}>
              {getCustomIcon(day.icon, `${scss.cardIcons}`)}
            </div>

            <div className={scss.temp}>
              <span className={scss.tempValueMin}>{Math.round(day.min)}°</span>

              <TemperatureBar
                dayMin={day.min}
                dayMax={day.max}
                weekMin={weekMin}
                weekMax={weekMax}
              />

              <span className={scss.tempValueMax}>{Math.round(day.max)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
