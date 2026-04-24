import scss from "./main.module.scss";

import WeatherSection from "./WeatherSection/WeatherSection";
import NewsFeed from "./NewsFeed/NewsFeed";
import PhotoGallery from "./PhotoGallery/PhotoGallery";

export default function Main() {
  return (
    <main className={scss.main}>
      <div className="container">
        <div className={scss.content}>
          <WeatherSection />
          <NewsFeed />
          <PhotoGallery />
        </div>
      </div>
    </main>
  );
}
