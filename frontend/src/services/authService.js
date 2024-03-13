// src/services/authService.js

const API_URL = "http://localhost:3001";
//const API_URL = "https://fashio8fusion-p9p9.onrender.com";

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const signin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchResetPassword = async (name, email, password) => {
  try {
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
};
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the authentication token from local storage
    const response = await fetch("http://localhost:3001/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the authentication token from local storage
    const response = await fetch("http://localhost:3001/api/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to update user profile");
    }
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};
