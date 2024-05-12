// Import the necessary modules
import React, { createContext, useContext, useEffect, useState } from "react";
import { signin } from "../services/authService";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  // Function to log in the user
  const signinUser = async (email, password) => {
    try {
      const data = await signin(email, password);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      // Redirect or perform any other actions after sign-in
      window.location.href = "/UserProfile";
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function to log out the user
  const signoutUser = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Update the user state to null
    setUser(null);
    // Redirect or perform any other actions after sign-out
    window.location.href = "/signin";
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    // Check if the user object is not null and contains necessary data
    return user !== null && user.token !== undefined;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signinUser,
        signoutUser,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
