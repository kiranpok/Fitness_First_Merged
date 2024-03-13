import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

const Header = () => {
  const { isAuthenticated, user, signoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="header">
      <div className="logo">Fitness-First</div>
      <nav className="nav">
        <Link to="/dashboard">Goals</Link>
        <Link to="/activityForm">Activities</Link>
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
              <Link to="/profile" style={{ display: 'block' }}>
                Profile
              </Link>
              <button onClick={signoutUser} style={{ display: 'block' }}>
                Sign out
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
            <Link to="/signin">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
