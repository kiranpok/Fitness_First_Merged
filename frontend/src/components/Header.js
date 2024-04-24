import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { t } = useTranslation();
    const { isAuthenticated, user, signoutUser } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        signoutUser();
        navigate("/");
    };

    return (
        <div className="header">
            <Link to="/" className="logo">Fitness-First</Link>
            <button className="hamburger-menu" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/dashboard" onClick={toggleMenu}>{t('header.goals')}</Link>
                <div className="dropdown">
                    <span className="dropbtn">{t("header.activities")}</span>
                    <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
                        <Link to="/activityForm" onClick={toggleMenu}>
                            {t("header.activity_form")}
                        </Link>
                        <Link to="/activityList" onClick={toggleMenu}>
                            {t("header.activity_list")}
                        </Link>
                        <Link to="/activityStats" onClick={toggleMenu}>
                            {t("header.activity_stats")}
                        </Link>
                    </div>
                </div>
                <div
                    onClick={toggleDropdown}
                    style={{ position: "relative", cursor: "pointer", marginLeft: "10px" }}
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
                            <button style={{ display: 'block' }} onClick={handleLogout}>
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





