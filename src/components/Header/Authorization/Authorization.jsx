import { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import scss from "./authorization.module.scss";

export default function Authorization({ isOpen, onClose, onLogin }) {
  const [currentForm, setCurrentForm] = useState("signup");

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={scss.authorization} onClick={handleOverlayClick}>
      {currentForm === "signup" ? (
        <SignUp
          onClose={onClose}
          onSwitchToLogin={() => setCurrentForm("login")}
          onLogin={onLogin}
        />
      ) : (
        <LogIn
          onClose={onClose}
          onSwitchToSignup={() => setCurrentForm("signup")}
          onLogin={onLogin}
        />
      )}
    </div>
  );
}
