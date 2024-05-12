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
    const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
    const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleActivityDropdown = () => {
        setActivityDropdownOpen(!activityDropdownOpen);
        setDashboardDropdownOpen(false);
        setProfileDropdownOpen(false);
    };

    const toggleDashboardDropdown = () => {
        setDashboardDropdownOpen(!dashboardDropdownOpen);
        setActivityDropdownOpen(false);
        setProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
        setActivityDropdownOpen(false);
        setDashboardDropdownOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActivityDropdownOpen(false);
        setDashboardDropdownOpen(false);
        setProfileDropdownOpen(false);
    };

    const handleLogout = () => {
        signoutUser();
        navigate("/signin");
    };

    return (
        <div className="header">
            <Link to="/" className="logo">Fitness-First</Link>
            <button className="hamburger-menu" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <div className="btn-group">
                    <button
                        className={`btn btn-lg dropdown-toggle ${dashboardDropdownOpen ? 'active' : ''}`}
                        type="button"
                        onClick={toggleDashboardDropdown}
                    >
                        {t("header.dashboard")}
                    </button>
                    <ul className={`dropdown-menu ${dashboardDropdownOpen ? 'show' : ''}`}>
                        <li>
                            <Link to="/activitylist" onClick={toggleMenu}>
                                {t("header.my_activity")}
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" onClick={toggleMenu}>
                                {t("header.my_goal")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn btn-lg dropdown-toggle ${activityDropdownOpen ? 'active' : ''}`}
                        type="button"
                        onClick={toggleActivityDropdown}
                    >
                        {t("header.add_exercise")}
                    </button>
                    <ul className={`dropdown-menu ${activityDropdownOpen ? 'show' : ''}`}>
                        <li>
                            <Link to="/activityForm" onClick={toggleMenu}>
                                {t("header.create_activity")}
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" onClick={toggleMenu}>
                                {t("header.create_goal")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn btn-lg dropdown-toggle ${profileDropdownOpen ? 'active' : ''}`}
                        type="button"
                        onClick={toggleProfileDropdown}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <ul className={`dropdown-menu ${profileDropdownOpen ? 'show' : ''}`}>
                        <li>
                            <Link to="/profile" onClick={toggleMenu}>
                                {t("header.profile")}
                            </Link>
                        </li>
                        <li>
                            <button className="btn btn-lg logout-btn" onClick={handleLogout}>
                                {t("header.logout")}
                            </button>
                        </li>
                    </ul>
                </div>
                {isAuthenticated() ? (
                    <span style={{ display: 'inline-block', marginRight: '10px' }}>
                        {t('header.welcome')}, {user.email}
                    </span>
                ) : (
                    <>
                        <Link to="/signin" className="btn btn-lg btn-primary" onClick={toggleMenu}> {t('header.login')}</Link>
                        <Link to="/signup" className="btn btn-lg btn-primary" onClick={toggleMenu}> {t('header.signup')}</Link>
                    </>
                )}
                <LanguageSwitch />
            </nav>
        </div>
    );
};

export default Header;
