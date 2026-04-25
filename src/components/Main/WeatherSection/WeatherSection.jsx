import WeatherCard from "./WeatherCard/WeatherCard";
import Dashboard from "./Dashboard/Dashboard";

import { useCities } from "../../context/CitiesProvider";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import scss from "./weatherSection.module.scss";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeatherSection() {
  const { cities } = useCities();

  if (cities.length === 0) return null;

  return (
    <div className={scss.weatherSection} id="TrackedLocations">
      <div className={scss.locations}>
        <h3 className={scss.weatherSectionTitle} data-aos="fade-up">
          Tracked Locations
        </h3>
        <div className={scss.weatherCardsCarousel} data-aos="zoom-in">
          <Swiper
            slidesPerView={1}
            spaceBetween={23}
            navigation={{
              prevEl: ".weather-prev",
              nextEl: ".weather-next",
            }}
            modules={[Navigation]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            className={scss.swiperContainer}
          >
            {cities.map((city) => (
              <SwiperSlide className={scss.swiperSlide} key={city}>
                <WeatherCard cityName={city} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={scss.carouselNavigation}>
            <button className={`${scss.navBtn} weather-prev`}>
              <ChevronLeft size={20} />
            </button>
            <button className={`${scss.navBtn} weather-next`}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}
