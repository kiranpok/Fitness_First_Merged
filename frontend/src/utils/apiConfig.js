const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

const ApiUtils = {
  fetchResetPassword: async (email) => {
    try {
      const response = await fetch(`${apiUrl}/api/forgotpassword`, {
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
