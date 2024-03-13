import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import Footer from "../components/Footer";
//import UserProfile from "../components/UserProfile";

const SignIn = ({ setIsSignIn, setUserEmail }) => {
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
        <h2>Sign In</h2>
        <label>Email address:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
        />
        <label>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />

        <button type="submit">Sign In</button>

        <nav>
          <div>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to="/forgotpassword">ForgetPassword?</Link>
            </p>
          </div>
        </nav>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
