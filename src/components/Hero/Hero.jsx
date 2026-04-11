import scss from "./hero.module.scss";
import React from "react";

import Icon from "../../assets/icons/search.png";

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
    <div className={scss.dateContainer}>
      <div className={scss.dateMonthYear}>{monthYear}</div>
      <div className={scss.dateWeekdayDay}>
        {weekday}, {day}
        <sup>{getOrdinalSuffix(day)}</sup>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={scss.hero}>
      <div className="container">
        <div className={scss.heroContent}>
          <div className={scss.heroContentTop}>
            <h2 className={scss.heroTitle}>Weather dashboard</h2>
            <div className={scss.heroDescriptionWrapper}>
              <p className={scss.heroInfoTxt}>
                Create your personal list of favorite cities and always be aware
                of the weather.
              </p>
              <div className={scss.heroVerticalLine}></div>
              <FancyDate />
            </div>
          </div>


          <div className={scss.heroSearchBar}>
            <form className={scss.heroSearchForm}>
              <input
                type="text"
                className={scss.hearoSearchInput}
                placeholder="Search location..."
              />
              <button type="submit" className={scss.heroSearchButton}>
                <img src={Icon} alt="Search" className={scss.heroSearchBtn} />
              </button>
            </form>
          </div>


        </div>
      </div>
      <div className={scss.heroOverlay}></div>
    </section>
  );
}
