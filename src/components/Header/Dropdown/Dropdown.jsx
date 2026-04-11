import scss from "./dropdown.module.scss";

import React, { useState, useEffect, useRef } from "react";

import arrow from "../../../assets/icons/arrow.svg";

export default function Dropdown({ currentUser, onOpenAuth }) {
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
      <button className={scss.dropdownBtn} onClick={toggleDropdown}>
        Menu
        {isOpen ? (
          <img
            src={arrow}
            alt="arrow"
            className={scss.arrow}
            style={{ transform: "rotate(0)" }}
          />
        ) : (
          <img
            src={arrow}
            alt="arrow"
            className={scss.arrow}
            style={{ transform: "rotate(90deg)" }}
          />
        )}
      </button>

      <div className={`${scss.dropdownItem} ${isOpen ? scss.open : ""}`}>
        <nav className={scss.dropdownNav}>
          <a href="#" className={scss.dropdownNavLink}>
            Who we are
          </a>
          <a href="#" className={scss.dropdownNavLink}>
            Contacts
          </a>
          <a href="#" className={scss.dropdownNavLink}>
            Menu
          </a>
        </nav>
        <div className={scss.dropdownProfile}>
          {currentUser ? (
            <span className={scss.dropdownСurrentUser}>
              Hello, {currentUser.username}
            </span>
          ) : (
            <button
              className={scss.dropdownSign}
              onClick={() => {
                setIsOpen(false);
                if (onOpenAuth) onOpenAuth();
              }}
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
