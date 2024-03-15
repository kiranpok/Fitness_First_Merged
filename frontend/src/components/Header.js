import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

const Header = () => {
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
      <Link to="/" className="logo">
        Fitness-First
      </Link>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/dashboard" onClick={toggleMenu}>
          Goals
        </Link>
        <Link to="/activityForm" onClick={toggleMenu}>
          Activities
        </Link>
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
              <Link
                to="/profile"
                style={{ display: "block" }}
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button onClick={signoutUser} style={{ display: "block" }}>
                Sign out
              </button>
            </div>
          )}
        </div>
        {isAuthenticated() ? (
          <span style={{ display: "inline-block", marginRight: "10px" }}>
            Welcome, {user.email}
          </span>
        ) : (
          <>
            <Link to="/signin" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
