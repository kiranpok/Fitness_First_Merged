import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/home.css";

import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="main-text">
          <h1 className="h1">Transform Your Fitness Journey</h1>
          <h2 className="h2">Get Your Body Fit</h2>
          <button
            onClick={() => navigate("/register")}
            className="join-us-button"
          >
            Join Us
          </button>
        </div>
        <img src="/fitness.png" alt="fitness" className="fitness-pic" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
