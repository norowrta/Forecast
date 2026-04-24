import scss from "./newsFeed.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCities } from "../../context/CitiesProvider";
import { toast, Bounce } from "react-toastify";
import { ChevronDown } from "lucide-react";

export default function NewsFeed() {
  const { cities } = useCities();
  const { selectedCity } = useCities();

  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchNews = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

        const safeCityName = encodeURIComponent(`"${selectedCity}"`);

        let response = await axios.get(
          `${BASE_URL}everything?qInTitle=${safeCityName}&sortBy=popularity&language=en&apiKey=${API_KEY}`,
        );

        if (response.data.articles.length === 0) {
          response = await axios.get(
            `${BASE_URL}everything?qInTitle=${safeCityName}&sortBy=popularity&apiKey=${API_KEY}`,
          );
        }

        const formattedNews = response.data.articles
          .slice(0, 10)
          .map((article) => {
            const dateObj = new Date(article.publishedAt);
            const formattedDate = dateObj
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              .toUpperCase();

            return {
              source: article.source.name,
              date: formattedDate,
              title: article.title,
              description: article.description,
              url: article.url,
            };
          });

        setNews(formattedNews);
        setVisibleCount(2);
      } catch (error) {
        toast.error(`Error loading news: ${error.message}`, {
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
    };

    fetchNews();
  }, [selectedCity]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  if (!cities.length) return null;

  if (!news.length)
    return (
      <div className={scss.newsFeed} id="NewsFeed">
        <h3 className={scss.title}>News Feed</h3>
        <div className={scss.emptyState}>
          <p className={scss.emptyText}>
            No recent dispatches found for
            <span className={scss.selectedCity}>{selectedCity}</span>...
          </p>
          <span className={scss.emptySubtext}>
            Try selecting a different location.
          </span>
        </div>
      </div>
    );

  return (
    <div className={scss.newsFeed} id="NewsFeed">
      <h3 className={scss.title} data-aos="fade-up">
        News Feed
      </h3>

      <div className={scss.mainContent}>
        {news.slice(0, visibleCount).map((item, index) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.newsCard}
            key={index}
            data-aos="fade-up"
          >
            <span className={scss.newsDate}>{item.date}</span>
            <div className={scss.newsInfo}>
              <span className={scss.newsSource}>{item.source}</span>

              <h2 className={scss.newsTitle}>{item.title}</h2>
              <p className={scss.newsDescr}>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      {visibleCount < news.length && (
        <button className={scss.showMoreBtn} onClick={handleShowMore}>
          Show more articles <ChevronDown className={scss.icon} />
        </button>
      )}
    </div>
  );
}
