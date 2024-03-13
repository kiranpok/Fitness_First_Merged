import React from "react";
import { useState } from "react";

// import "../styles/resetPassword.css";
import ApiUtils from "../utils/apiConfig";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Client-side form validation
    if (!newPassword || !confirmPassword) {
      setResetStatus("Please enter both new and confirm passwords.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setResetStatus("Passwords do not match. Please try again.");
      return;
    }

    try {
      const { success, message } = await ApiUtils.fetchResetPassword(
        newPassword
      );
      if (success) {
        setResetStatus("Password reset successfully.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setResetStatus(`Password reset failed. ${message}`);
      }
    } catch (error) {
      setResetStatus("Password reset request error: " + error.message);
    }
  };

  return (
    <div className="resetpassword">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            autoComplete="off"
            required
          />
          <label htmlFor="newPassword" className="placeholder">
            Enter New Password
          </label>
        </div>
        <div className="form">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            autoComplete="off"
            required
          />
          <label htmlFor="confirmPassword" className="placeholder">
            Confirm New Password
          </label>
        </div>
        <button type="submit" className="confirmButton">
          Confirm
        </button>
      </form>

      {resetStatus && <p>{resetStatus}</p>}
    </div>
  );
};

export default ResetPassword;
