import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const { signoutUser } = useAuth();
    const [logoutMessage, setLogoutMessage] = useState(null);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await signoutUser();
                setLogoutMessage("Logout successful.");
                navigate("/");
            } catch (error) {
                console.error("Error logging out:", error.message);
                setLogoutMessage("Logout failed. Please try again.");
                // Handle logout error
            }
        };

        // Call handleLogout function immediately upon component render
        handleLogout();
    }, [navigate, signoutUser]);

    return (
        <div>
            {logoutMessage && <p>{logoutMessage}</p>}
        </div>
    );
};

export default Logout;
