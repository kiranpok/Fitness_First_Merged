import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/authService";
import UserProfileEditForm from "./UserProfileEditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "../styles/profile.css";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfileData = localStorage.getItem("profileData");
    if (savedProfileData) {
      setUpdatedProfileData(JSON.parse(savedProfileData));
    }
  }, []);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await getUserProfile();
        setUserProfile(userProfileData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileData();
  }, [updateSuccess]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const updatedUserProfile = await updateUserProfile(updatedData);
      setUpdatedProfileData(updatedUserProfile);
      setUserProfile(updatedUserProfile);
      setUpdateSuccess(true);
      setIsEditing(false);
      localStorage.setItem("profileData", JSON.stringify(updatedUserProfile));

      // Fetch the updated user profile data after successful update
      const userProfileData = await getUserProfile();
      setUserProfile(userProfileData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
      <div className="user-profile">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {updateSuccess && <p>Profile updated successfully!</p>}
        {userProfile && (
          <div>
            <h2>User Profile</h2>
            <img
              src={
                (updatedProfileData && updatedProfileData.avatar) ||
                userProfile.avatar ||
                "https://via.placeholder.com/100?text=Profile+Avatar"
              }
              alt="Profile Avatar"
              style={{ borderRadius: "50%" }} // This will make the image round
            />
            <p>
              {(updatedProfileData && updatedProfileData.name) || userProfile.name}, 
              {(updatedProfileData && updatedProfileData.email) || userProfile.email}
            </p>
            <p>Gender: {(updatedProfileData && updatedProfileData.gender) || userProfile.gender}</p>
            <p>Birthdate: {(updatedProfileData && updatedProfileData.birthdate) || userProfile.birthdate}</p>
            <p>Height: {(updatedProfileData && updatedProfileData.height) || userProfile.height}</p>
            <p>Weight: {(updatedProfileData && updatedProfileData.weight) || userProfile.weight}</p>
            {isEditing ? (
              <UserProfileEditForm
                userProfileData={userProfile}
                handleProfileUpdate={handleProfileUpdate}
                handleCancel={() => setIsEditing(false)}
              />
            ) : (
              <button
                className="settings-button"
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faCog} /> Update Profile
              </button>
            )}
          </div>
        )}
        {!userProfile && <p>User profile data not available</p>}
      </div>
  );};
export default UserProfile;
