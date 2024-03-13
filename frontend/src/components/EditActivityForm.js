import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditActivityForm = ({ onCancel }) => {
  const { id: routeId } = useParams();

  const [editedActivity, setEditedActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  /*
    useEffect(() => {
      if (routeId) {
        console.log("Fetching activity details for id:", routeId);
        // Fetch the activity details based on activityId
        fetch(`http://localhost:3001/api/activities/${routeId}`)
          .then((response) => response.json())
          .then((data) => {
            setEditedActivity(data);
          })
          .catch((error) =>
            console.error("Error fetching activity details", error)
          );
      }
    }, [routeId]);
    */

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Edit Activity</h2>
      <label>
        Activity Name:
        <input
          type="text"
          value={editedActivity.activityName || ""}
          onChange={(e) => handleInputChange("activityName", e.target.value)}
        />
      </label>

      <label>
        Start Time:
        <input
          type="text"
          value={editedActivity.startTime || ""}
          onChange={(e) => handleInputChange("startTime", e.target.value)}
        />
      </label>

      <label>
        Date:
        <input
          type="text"
          value={editedActivity.date || ""}
          onChange={(e) => handleInputChange("date", e.target.value)}
        />
      </label>

      <label>
        Activity Type:
        <input
          type="text"
          value={editedActivity.activityType || ""}
          onChange={(e) => handleInputChange("activityType", e.target.value)}
        />
      </label>

      <label>
        Duration:
        <input
          type="text"
          value={editedActivity.duration || ""}
          onChange={(e) => handleInputChange("duration", e.target.value)}
        />
      </label>

      <label>
        Distance:
        <input
          type="text"
          value={editedActivity.distance || ""}
          onChange={(e) => handleInputChange("distance", e.target.value)}
        />
      </label>

      <label>
        Pace:
        <input
          type="text"
          value={editedActivity.pace || ""}
          onChange={(e) => handleInputChange("pace", e.target.value)}
        />
      </label>

      <label>
        Notes:
        <input
          type="text"
          value={editedActivity.notes || ""}
          onChange={(e) => handleInputChange("notes", e.target.value)}
        />
      </label>

      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditActivityForm;
