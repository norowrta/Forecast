import scss from "./dropdown.module.scss";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MapPinSearch,
  Rss,
  Images,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Dropdown({ currentUser, onOpenAuth, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={scss.dropdown} ref={dropdownRef}>
      <button className={scss.btn} onClick={toggleDropdown}>
        {isOpen ? <X color="#F4F4F5" /> : <Menu color="#F4F4F5" />}
      </button>

      <div className={`${scss.item} ${isOpen ? scss.open : ""}`}>
        <nav className={scss.nav}>
          <a
            href="#TrackedLocations"
            className={scss.navLink}
            onClick={() => setIsOpen(false)}
          >
            <MapPinSearch className={scss.linkIcon} /> Tracked Locations
          </a>
          <a
            href="#NewsFeed"
            className={scss.navLink}
            onClick={() => setIsOpen(false)}
          >
            <Rss className={scss.linkIcon} /> News Feed
          </a>
          <a
            href="#PhotoGallery"
            className={scss.navLink}
            onClick={() => setIsOpen(false)}
          >
            <Images className={scss.linkIcon} /> Photo Gallery
          </a>
        </nav>
        <div className={scss.profile}>
          {currentUser ? (
            <>
              <button
                className={scss.signUpBtn}
                onClick={() => {
                  setIsOpen(false);
                  if (onLogout) onLogout();
                }}
              >
                Log Out <LogOut className={scss.logIcon} />
              </button>
            </>
          ) : (
            <button
              className={scss.signUpBtn}
              onClick={() => {
                setIsOpen(false);
                if (onOpenAuth) onOpenAuth();
              }}
            >
              Log In <LogIn className={scss.logIcon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
