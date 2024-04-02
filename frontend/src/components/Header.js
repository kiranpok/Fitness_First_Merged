import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";


const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, signoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);


  };

  return (
    <div className="header">
      <Link to="/home" className="logo">Fitness-First</Link>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/dashboard" onClick={toggleMenu}>{t('header.goals')}</Link>
        <Link to="/activityForm" onClick={toggleMenu}>{t('header.activities')}</Link>
        
        <div
          onClick={toggleDropdown}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faUser} />
          {dropdownOpen && (
            <div
              style={{
                backgroundColor: "lightblue",
              }}
            >
              <Link to="/profile" style={{ display: 'block' }} onClick={toggleMenu}>
              {t('header.profile')}
              </Link>
              <button onClick={signoutUser} style={{ display: 'block' }}>
               {t('header.logout')}
              </button>
            </div>
          )}
        </div>
        {isAuthenticated() ? (
          <span style={{ display: 'inline-block', marginRight: '10px' }}>
            Welcome, {user.email}
          </span>
        ) : (
          <>
            <Link to="/signin" onClick={toggleMenu}> {t('header.login')}</Link>
            <Link to="/signup" onClick={toggleMenu}> {t('header.signup')}</Link>
          </>
         
          
        )}
         <LanguageSwitch />
      </nav>
      
    </div>
  );
  
};

export default Header;