// apiConfig.js
// export const REACT_APP_API_URL = "http://localhost:3001";

export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"; // Update with your actual backend URL

const ApiUtils = {
  fetchResetPassword: async (email) => {
    try {
      // const response = await fetch(`${apiUrl}/api/resetpassword`, {
      const response = await fetch("http://localhost:3001/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      } else {
        const data = await response.json();
        return { success: false, message: data.message || "Unknown error" };
      }
    } catch (error) {
      return { success: false, message: error.message || "Request error" };
    }
  },
  // Add other API calls as needed
};

export default ApiUtils;
