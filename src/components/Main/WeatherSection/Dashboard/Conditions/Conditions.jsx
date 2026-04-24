import scss from "./conditions.module.scss";
import {
  Thermometer,
  ArrowUpDown,
  Droplets,
  Gauge,
  Wind,
  Eye,
} from "lucide-react";

export default function Conditions({ data }) {
  if (!data) return null;

  const feelsLike = Math.round(data.main.feels_like);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);

  const humidity = data.main.humidity;
  const pressure = data.main.pressure;

  const windSpeed = Math.round(data.wind.speed * 3.6);

  const visibility = data.visibility / 1000;

  return (
    <div className={scss.conditions}>
      <h3 className={scss.title}>Current Conditions </h3>

      <div className={scss.mainContent}>
        <div className={scss.card}>
          <span className={scss.category}>
            <Thermometer className={scss.iconValue} /> FEELS LIKE
          </span>

          <span className={scss.value}>{feelsLike}°</span>
        </div>

        <div className={scss.card}>
          <span className={scss.category}>
            <ArrowUpDown className={scss.iconValue} /> MIN / MAX
          </span>
          <span className={scss.value}>
            {tempMin}° / {tempMax}°
          </span>
        </div>

        <div className={scss.card}>
          <span className={scss.category}>
            <Droplets className={scss.iconValue} /> HUMIDITY
          </span>
          <span className={scss.value}>{humidity}%</span>
        </div>

        <div className={scss.card}>
          <span className={scss.category}>
            <Gauge className={scss.iconValue} /> PRESSURE
          </span>
          <span className={scss.value}>{pressure} hPa</span>
        </div>

        <div className={scss.card}>
          <span className={scss.category}>
            <Wind className={scss.iconValue} /> WIND
          </span>
          <span className={scss.value}>{windSpeed} km/h</span>
        </div>

        <div className={scss.card}>
          <span className={scss.category}>
            <Eye className={scss.iconValue} /> VISIBILITY
          </span>
          <span className={scss.value}>{visibility} km</span>
        </div>
      </div>
    </div>
  );
}
