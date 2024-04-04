import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../services/authService";
import "../styles/userProfileEditForm.css";

const UserProfileEditForm = ({ userProfileData, handleProfileUpdate, handleCancel }) => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [user, setUser] = useState({
    name: "",
    gender: "",
    birthdate: "",
    height: "",
    weight: "",
    avatar: null,
  });

  useEffect(() => {
    console.log("userProfileData", userProfileData);
    setUser({
      ...userProfileData,
    });
  }, [userProfileData]);

  const handleImageUpload = (e) => {
    setUser({ ...user, avatar: e.target.files[0] });
  };

    const handleInputChange = (e, field) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: e.target.value,
        }));
    };
  const handleSave = async () => {
    try {
      // Call updateUserProfile function to update the profile data
      const updatedProfile = await updateUserProfile(user);
      // console.log("Profile updated successfully", updatedProfile);
      setUser(updatedProfile); // Update the local state with the updated profile
      setShowSuccessMsg(true);
      handleProfileUpdate(updatedProfile); // Update the user profile data in the parent component
  
      // Reset success message after 3 seconds (adjust the timeout as needed)
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("Error updating profile:", error);
    }
  };


    return (
        <div className="user-profile-edit-form">
            {showSuccessMsg && (
                <p className="success-msg">Profile updated successfully!</p>
            )}
            <h2 className="user-profile-edit-title">Update Your Profile</h2>
            {/* Input fields for editing profile data */}
            <input
                type="file"
                onChange={handleImageUpload}
                className="input-field"
            />
            <input
                type="text"
                value={user.name}
                onChange={(e) => handleInputChange(e, "name")}
                placeholder="Name"
                className="input-field"
            />
            <input
                type="text"
                value={user.gender}
                onChange={(e) => handleInputChange(e, "gender")}
                placeholder="Gender"
                className="input-field"
            />
            <input
                type="date"
                value={user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ""}
                onChange={(e) => handleInputChange(e, "birthdate")}
                placeholder="Birthdate"
                className="input-field"
            />
            <input
                type="number"
                value={user.height}
                onChange={(e) => handleInputChange(e, "height")}
                placeholder="Height (cm)"
                className="input-field"
            />
            <input
                type="number"
                value={user.weight}
                onChange={(e) => handleInputChange(e, "weight")}
                placeholder="Weight (kg)"
                className="input-field"
            />
            {/* Save button */}
            <button onClick={handleSave} className="save-button">
                Update
            </button>
            <button onClick={handleCancel} className="cancel-button">
                Cancel
            </button>
        </div>
    );
};


export default UserProfileEditForm;