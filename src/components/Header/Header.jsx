import { useState } from "react";
import scss from "./header.module.scss";

import { useAuth } from "../context/AuthContext";

import Dropdown from "./Dropdown/Dropdown";
import Authorization from "./Authorization/Authorization";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { currentUser, logout } = useAuth();

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div data-aos="fade-right">
            <a href="#" className={scss.logo}>
              Forecast
            </a>
          </div>
          <nav className={scss.nav} data-aos="fade-down">
            <a href="#TrackedLocations" className={scss.navLink}>
              Tracked Locations
            </a>
            <a href="#NewsFeed" className={scss.navLink}>
              News Feed
            </a>
            <a href="#PhotoGallery" className={scss.navLink}>
              Photo Gallery
            </a>
          </nav>

          <div className={scss.userActions} data-aos="fade-left">
            {currentUser ? (
              <>
                <button className={scss.authButton} onClick={logout}>
                  Log Out
                </button>
              </>
            ) : (
              <button
                className={scss.authButton}
                onClick={() => setIsAuthOpen(true)}
              >
                Log In
              </button>
            )}
          </div>

          <Dropdown
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={logout}
          />
        </div>
      </div>

      <Authorization isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
