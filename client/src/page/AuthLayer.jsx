import React, { useState } from "react";
import {
  signup_LanguageEnglish,
  signup_LanguageAmharic,
  signup_LanguageOromice,
} from "../component/config/config.js";
import "./auth/Css/AuthLayer.css";
import logo from "../assets/Logo.png";
import { RiArrowDownSFill } from "react-icons/ri";
import Signup from "./auth/Signin";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AuthLayer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isOpen, setIsOpen] = useState(false);
  const Location = useLocation();
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.getAttribute("value")); // Use getAttribute to get the value
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  var Language;
  if (selectedLanguage === "English") {
    Language = signup_LanguageEnglish;
  } else if (selectedLanguage === "Amharic") {
    Language = signup_LanguageAmharic;
  } else {
    Language = signup_LanguageOromice;
  }
  return (
    <div className="Allconten">
      <div className="main_auth_contener">
        <h1>{Language.welcomeText}</h1>

        <div className="Language" onClick={toggleDropdown}>
          <span>{selectedLanguage}</span>
          <RiArrowDownSFill />

          {isOpen && (
            <div className="ListOfLanguage">
              <p value="English" onClick={handleLanguageChange}>
                English
              </p>
              <p value="Amharic" onClick={handleLanguageChange}>
                Amharic
              </p>
              <p value="afan oromo" onClick={handleLanguageChange}>
                Afan Oromo
              </p>
            </div>
          )}
        </div>
        <span className="goldeDecor">
          <img src={logo} alt="Logo" />
        </span>
      </div>

      {/* Pass selectedLanguage to Signup */}
      {Location.pathname === "/auth/login" ? (
        <Outlet />
      ) : (
        <Signup selectedLanguage={selectedLanguage} />
      )}
    </div>
  );
};

export default AuthLayer;
