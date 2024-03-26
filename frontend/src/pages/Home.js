import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="home-container">
        <div className="main-content">
          <div className="main-text">
            <h1 className="h1">{t("welcome")}</h1>
            <h2 className="h2">{t("description")}</h2>
            <button
              onClick={() => navigate("/signup")}
              className="join-us-button"
            >
              {t("join_us")}
            </button>
          </div>
          <img src="/fitness.jpg" alt="fitness" className="fitness-pic" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
