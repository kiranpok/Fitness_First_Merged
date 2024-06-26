import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/home.css";
import { useTranslation } from "react-i18next";




const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <>
    <div className="home-container">
      <div className="main-content">
        <div className="main-text">
          <h1 className="h1">{t('welcome')}</h1>
          <h2 className="h2">{t('description')}</h2>
          <button
            onClick={() => navigate("/signup")}
            className="join-us-button"
          >
            {t('join_us')}
          </button>
        </div>
        <div className="fitness-pic"></div>
      </div>
    
    </div>
    <Footer/>
    </>
  );
};

export default Home;
