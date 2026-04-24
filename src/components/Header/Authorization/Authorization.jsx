import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import scss from "./authorization.module.scss";

export default function Authorization({ isOpen, onClose }) {
  const [currentForm, setCurrentForm] = useState("login");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={scss.authorization} onClick={handleOverlayClick}>
      <div className={scss.wrapper}>
        {currentForm === "signup" ? (
          <SignUp
            onClose={onClose}
            onSwitchToLogin={() => setCurrentForm("login")}
          />
        ) : (
          <LogIn
            onClose={onClose}
            onSwitchToSignup={() => setCurrentForm("signup")}
          />
        )}
      </div>
    </div>
  );
}
