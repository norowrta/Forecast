import { useState } from "react";
import scss from "./header.module.scss";

import Dropdown from "./Dropdown/Dropdown";
import Authorization from "./Authorization/Authorization";

import logo from "../../assets/icons/logo.png";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );

  return (
    <header>
      <div className="container">
        <div className={scss.headerContent}>
          <div className={scss.headerContentMain}>
            <a href="#" className={scss.logoLink}>
              <img src={logo} alt="logo" className={scss.logo} />
            </a>
            <Dropdown
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
            />

            <nav className={scss.headerNav}>
              <a href="#" className={scss.headerNavLink}>
                Who we are
              </a>
              <a href="#" className={scss.headerNavLink}>
                Contacts
              </a>
              <a href="#" className={scss.headerNavLink}>
                Menu
              </a>
            </nav>
          </div>
          <div className={scss.userActions}>
            {currentUser ? (
              <span className={scss.userName}>
                Hello, {currentUser.username}
              </span>
            ) : (
              <button
                className={scss.authButton}
                onClick={() => setIsAuthOpen(true)}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      <Authorization
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => setCurrentUser(user)}
      />
    </header>
  );
}
