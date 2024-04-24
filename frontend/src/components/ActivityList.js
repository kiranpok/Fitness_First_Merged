import React, { useState, useEffect } from "react";
import "../styles/activityList.css";
import Footer from "./Footer";
import EditActivityForm from "./EditActivityForm";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';


const ActivityList = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [editActivityId, setEditActivityId] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState({});
  const [deleteActivityId, setDeleteActivityId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    setShowDeletePrompt({ ...showDeletePrompt, [activityId]: true });
    setDeleteActivityId(activityId);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:3001/api/activities/delete/${deleteActivityId}`, {
      method: "DELETE",
    })
        .then(() => {
          console.log("Activity deleted successfully");
          setShowDeletePrompt({ ...showDeletePrompt, [deleteActivityId]: false });
          fetchActivities();
        })
        .catch((error) => console.error("Error deleting activity", error));
  };

  const handleDeleteCancel = () => {
    setShowDeletePrompt({ ...showDeletePrompt, [deleteActivityId]: false });
    setDeleteActivityId(null);
  };

  return (
      <div className="activity-list-container">
        {activities.map((activity) => (
            <div key={activity._id} className="activity-item">
              <div className="left-side">
                <div className="details-line">
                  <strong>{t('activity_list.name')}</strong>{activity.activityName}
                </div>
                <div className="details-line"><strong>{t('activity_list.activity_type')}</strong>{activity.activityType} </div>
                <div className="details-line"><strong>{t('activity_list.distance')}</strong>{activity.distance}</div>
                <div className="details-line"><strong>{t('activity_list.duration')}</strong> {activity.duration}</div>
              </div>
              <div className="right-side">
                <div className="details-line profile-info">
                  {activity.user}<strong>{t('activity_list.date')} </strong>{new Date(activity.date).toLocaleDateString('en-GB')} | {activity.startTime}
                </div>
                <div className="details-line"> <strong>{t('activity_list.notes')} </strong>{activity.notes}</div>
              </div>
              <div className="buttons">
                <button onClick={() => handleEdit(activity._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(activity._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>

              {editActivityId && (
                  <EditActivityForm
                      activityId={editActivityId}
                      onCancel={() => setEditActivityId(null)}
                  />
              )}
              {showDeletePrompt[activity._id] && (
                  <div className="delete-prompt">
                    <p>{t('activity_list.para')}</p>
                    <button onClick={handleDeleteConfirm}>{t('activity_list.ok')}</button>
                    <button onClick={handleDeleteCancel}>{t('activity_list.cancel')}</button>
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
