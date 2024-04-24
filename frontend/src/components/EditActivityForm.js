// EditActivityForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/editActivityForm.css"; // Import the new CSS file

const EditActivityForm = () => {
    const { id: routeId } = useParams();
    const [editedActivity, setEditedActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivityDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/activities/${routeId}`
                );
                const data = await response.json();
                console.log("Fetched activity details:", data);
                setEditedActivity(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching activity details", error);
                setError("Error fetching activity details");
                setLoading(false);
            }
        };

        if (routeId) {
            console.log("Fetching activity details for id:", routeId);
            fetchActivityDetails();
        }
    }, [routeId]);

    const handleInputChange = (field, value) => {
        // Update the editedActivity state with the new value
        setEditedActivity({
            ...editedActivity,
            [field]: value,
        });
    };

    const handleSave = () => {
        fetch(`http://localhost:3001/api/activities/update/${routeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedActivity),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Activity updated successfully:", data);
                // After saving, navigate back to the ActivityList
                navigate("/activityList");
            })
            .catch((error) => console.error("Error updating activity", error));
    };

    const handleCancel = () => {
        navigate("/activityList");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="edit-activity-form-container">
            <h2>Edit Activity</h2>
            <div className="edit-activity-line">
                <label>Activity Name:</label>
                <input
                    type="text"
                    value={editedActivity.activityName || ""}
                    onChange={(e) => handleInputChange("activityName", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Start Time:</label>
                <input
                    type="text"
                    value={editedActivity.startTime || ""}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Date:</label>
                <input
                    type="text"
                    value={editedActivity.date || ""}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Activity Type:</label>
                <input
                    type="text"
                    value={editedActivity.activityType || ""}
                    onChange={(e) => handleInputChange("activityType", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Duration:</label>
                <input
                    type="text"
                    value={editedActivity.duration || ""}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Distance:</label>
                <input
                    type="text"
                    value={editedActivity.distance || ""}
                    onChange={(e) => handleInputChange("distance", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Pace:</label>
                <input
                    type="text"
                    value={editedActivity.pace || ""}
                    onChange={(e) => handleInputChange("pace", e.target.value)}
                />
            </div>

            <div className="edit-activity-line">
                <label>Notes:</label>
                <input
                    type="text"
                    value={editedActivity.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                />
            </div>

            <button className="edit-activity-button" onClick={handleSave}>
                Save
            </button>
            <button className="edit-activity-button" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default EditActivityForm;

