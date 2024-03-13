import React, { useState, useEffect } from "react";
import "../styles/activityList.css";
import Footer from "./Footer";
import EditActivityForm from "./EditActivityForm";
import { Link, useNavigate } from "react-router-dom";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [editActivityId, setEditActivityId] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch activities from the backend when the component mounts
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/activities/getAll"
      );
      const data = await response.json();
      console.log("Fetched activities:", data);
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error.message);
    }
  };

  const handleEdit = (activityId) => {
    console.log("Edit activity with id:", activityId);
    setEditActivityId(activityId);
    navigate(`/edit/${activityId}`);
  };

  const handleDelete = (activityId) => {
    setShowDeletePrompt(true);
    setDeleteActivityId(activityId);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:3001/api/activities/delete/${deleteActivityId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Activity deleted successfully");
        setShowDeletePrompt(false);
        fetchActivities();
      })
      .catch((error) => console.error("Error deleting activity", error));
  };

  const handleDeleteCancel = () => {
    setShowDeletePrompt(false);
    setDeleteActivityId(null);
  };

  return (
    <div className="activity-list-container">
      {activities.map((activity) => (
        <div key={activity._id} className="activity-item">
          <div className="left-side">
            <div className="details-line">
              <strong>{activity.activityName}</strong>
            </div>
            <div className="details-line">{activity.activityType}</div>
            <div className="details-line">{activity.distance} km</div>
            <div className="details-line">Duration: {activity.duration}</div>
          </div>
          <div className="right-side">
            <div className="details-line profile-info">
              {activity.user} | {activity.date} | {activity.startTime}
            </div>
            <div className="details-line">{activity.notes}</div>
          </div>
          <div className="buttons">
            <button onClick={() => handleEdit(activity._id)}>Edit</button>
            <button onClick={() => handleDelete(activity._id)}>Delete</button>
          </div>

          {editActivityId && (
            <EditActivityForm
              activityId={editActivityId}
              onCancel={() => setEditActivityId(null)}
            />
          )}
          {showDeletePrompt && (
            <div className="delete-prompt">
              <p>Are you sure you want to delete this activity?</p>
              <button onClick={handleDeleteConfirm}>Ok</button>
              <button onClick={handleDeleteCancel}>Cancel</button>
            </div>
          )}
        </div>
      ))}
      <Link to="/activityStats">Activity Stats</Link>
      <Footer />
    </div>
  );
};

export default ActivityList;
