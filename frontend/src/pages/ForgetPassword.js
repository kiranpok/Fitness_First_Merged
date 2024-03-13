import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiUtils from "../utils/apiConfig";
import "../styles/style.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Before API Call");
      const { success, message } = await ApiUtils.fetchResetPassword(email);
      console.log("After API Call", success, message);

      if (success) {
        // navigate to the reset password page
        navigate("/resetpassword?email=" + email);
        setResetStatus("Password reset request sent successfully.");
      } else {
        // set error message to the user
        setResetStatus("Failed to request password reset. Please try again.");
      }
    } catch (error) {
      // set error message to the user
      setResetStatus("Password reset request error: " + error.message);
    }
  };

  return (
    <form className="forgotpassword" onSubmit={handleForgotPassword}>
      <h2>Forgot Password?</h2>

      <label>Email address:</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="off"
      />

      <button type="submit" className="reset-button">
        Reset Password
      </button>
      {resetStatus && <p>{resetStatus}</p>}
    </form>
  );
};

export default ForgetPassword;
