import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../services/authService";
import "../styles/userProfileEditForm.css";
import { useTranslation } from "react-i18next";


const UserProfileEditForm = ({ userProfileData, handleProfileUpdate, handleCancel }) => {
  const { t } = useTranslation();
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

  export const handleImageUpload = (e) => {
    setUser({ ...user, avatar: e.target.files[0] });
  };
  const handleSave = async () => {
    try {
      // Call updateUserProfile function to update the profile data
      const updatedProfile = await updateUserProfile(user);
      console.log("Profile updated successfully", updatedProfile);
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
        <p className="success-msg">{t('update_profile.para')}</p>
      )}
      <h2 className="user-profile-edit-title">{t('update_profile.title')}</h2>
      
     
      <label>{t('update_profile.name')}</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="input-field"
      />
      <label>{t('update_profile.gender')}</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, gender: e.target.value })}
        className="input-field"
      />
      <label>{t('update_profile.birth_date')}</label>

      <input
        type="text"
        onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
        className="input-field"
      />
      <label>{t('update_profile.height')}</label>

      <input
        type="text"
        onChange={(e) => setUser({ ...user, height: e.target.value })}
        className="input-field"
      />
      <label>{t('update_profile.weight')}</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, weight: e.target.value })}
        className="input-field"
      />
      {/* Save button */}
      <button onClick={handleSave} className="save-button">
      {t('update_profile.update')}
      </button>
      <button onClick={handleCancel} className="cancel-button">
      {t('update_profile.cancel')}
      </button>
    </div>
  );
};

export default UserProfileEditForm;
