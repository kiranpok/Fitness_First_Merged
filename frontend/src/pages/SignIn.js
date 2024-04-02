import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import Footer from "../components/Footer";
import { useTranslation } from 'react-i18next';

//import UserProfile from "../components/UserProfile";

const SignIn = ({ setIsSignIn, setUserEmail }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to backend with email and password
      const response = await fetch("http://localhost:3001/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle the response on success
        const data = await response.json();
        console.log("Sign-in successful:", data);

        // Store the authentication token in local storage
        localStorage.setItem("token", data.token); // Assuming the token is returned as 'token' in the response

        // Set user as signed in
        setIsSignIn(true);

        // Update the userEmail state with the signed-in user's email
        setUserEmail(email);

        // Redirect to the home page
        navigate("/profile");
      } else {
        // Handle errors
        console.error("Sign-in error:", response.statusText);
      }
    } catch (error) {
      // Handle other errors
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <div>
      <form className="signin" onSubmit={handleSignin}>
        <h2>{t('login.title')}</h2>
        <label>{t('login.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
        />
        <label>{t('login.password')}</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />

        <button type="submit">{t('login.login')}</button>

        <nav>
          <div>
            <p>
            {t('login.account')} <Link to="/signup">{t('login.signup')}</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to="/forgotpassword">{t('login.forgot_password')}</Link>
            </p>
          </div>
        </nav>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;