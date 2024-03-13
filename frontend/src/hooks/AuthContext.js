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
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  // Function to log in the user
  const signinUser = async (email, password) => {
    try {
      const data = await signin(email, password);
      console.log("in auth context", data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
      window.location.href = "/UserProfile";

      setUser(data); // Assuming the response contains token, email, and name
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function to log out the user (you can implement this)
  const signoutUser = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Update the user state to null
    setUser(null);
    // Redirect or perform any other actions after sign-out
    // For example, you can use window.location.href = "/signin";
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    // Check if the user object is not null and contains necessary data
    return user !== null && user.token !== undefined;
  };

  // Check if the user is already authenticated (e.g., on page reload)
  useEffect(() => {
    // Implement your check here (e.g., check localStorage for a token)
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signinUser,
        signoutUser,
        isAuthenticated,
        isLoading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
