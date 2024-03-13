import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import Footer from "../components/Footer";

const SignUp = () => {
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
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label>First Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="off"
        />
        <label>Last Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="off"
        />
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

        <label>Confirm Password:</label>
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          autoComplete="off"
        />

        <button type="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  );
};

export default SignUp;
