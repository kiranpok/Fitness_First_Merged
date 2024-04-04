import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import Footer from "../components/Footer";
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        navigate("/signin");
      } else {
        console.error("Registration error:", response.statusText);
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
      <>
        <div>
          <form className="signup" onSubmit={handleSubmit}>
            <h2>{t('signup.title')}</h2>

            <label>{t('signup.name')}</label>
            <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete="off"
            />

            <label>{t('signup.email')}</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
            />

            <label>{t('signup.password')}</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
            />

            <label>{t('signup.confirm_password')}</label>
            <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                autoComplete="off"
            />

            <button type="submit">{t('signup.signup')}</button>
            <div>
            <p>
            {t('signup.account')} <Link to="/login">{t('login.login')}</Link>
            </p>
          </div>
          </form>
        </div>
        <Footer />
      </>
  );
};

export default SignUp;