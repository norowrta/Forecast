import { Line } from "react-chartjs-2";
import scss from "./hourlyForecast.module.scss";

// 1. ІМПОРТУЄМО ТА РЕЄСТРУЄМО НЕОБХІДНІ КОМПОНЕНТИ CHART.JS
import {
  Chart as ChartJS,
  CategoryScale, // Для осі X (категорії/час)
  LinearScale, // Для осі Y (числа/температура)
  PointElement, // Для крапок на лінії
  LineElement, // Для самої лінії
  Tooltip, // Для спливаючих підказок
  Filler, // Для зафарбовування області під лінією (опціонально)
} from "chart.js";

// Реєстрація (це обов'язковий крок у нових версіях Chart.js)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export default function HourlyForecast({ data }) {
  if (!data || !data.list) return null;

  const next24Hours = data.list.slice(0, 9);
  const xLabels = next24Hours.map((item) => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const yData = next24Hours.map((item) => Math.round(item.main.temp));

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Temperature",
        data: yData,
        borderColor: "#ffb775",
        backgroundColor: "rgba(243, 164, 108, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ffb775",
        pointBorderWidth: 2,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ffb775",
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#a0a0a0",
          font: { size: 12 },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#a0a0a0",
          font: { size: 12 },
          stepSize: 5,
          callback: (value) => `${value}°C`,
        },
      },
    },
    elements: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
  };

  return (
    <div className={scss.hourlyForecast} data-aos="fade-up" >
      <div className={scss.header}>
        <h3 className={scss.title}>Hourly Trend</h3>
        <span className={scss.subtitle}>Next 24h</span>
      </div>
      <div className={scss.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
