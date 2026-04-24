import scss from "./hero.module.scss";
import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

import { useCities } from "../context/CitiesProvider";

import { Search } from "lucide-react";

function FancyDate({ dateInput }) {
  const date = dateInput ? new Date(dateInput) : new Date();

  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const day = date.getDate();

  const getOrdinalSuffix = (n) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className={scss.date}>
      {monthYear} {weekday}, {day}
      <sup>{getOrdinalSuffix(day)}</sup>
    </div>
  );
}

export default function Hero() {
  const [searchValue, setSearchValue] = useState("");

  const { addCity } = useCities();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${baseUrl}weather`, {
        params: {
          q: searchValue,
          appid: apiKey,
          units: "metric",
        },
      });
      addCity(response.data.name);
      console.log(response.data);

      setSearchValue("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("City not found. Please try again.", {
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
      } else {
        toast.error("Something went wrong. Try later.", {
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
      }
    }
  };

  return (
    <section className={scss.hero}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.info} data-aos="fade-right">
            <h2 className={scss.title}>Weather dashboard</h2>
            <FancyDate />
          </div>
          <div className={scss.searchBar} data-aos="fade-left">
            <form className={scss.searchForm} onSubmit={handleSearchSubmit}>
              <button type="submit" className={scss.searchButton}>
                <Search color="#C1C6D7" className={scss.searchIcon} />
              </button>
              <input
                type="text"
                className={scss.searchInput}
                placeholder="Search location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <div className={scss.overlay}></div>
    </section>
  );
}
