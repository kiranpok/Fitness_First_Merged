import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/activityform.css";
import Footer from "./Footer";

const ActivityForm = () => {
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState("running");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSave = async(e) => {
    e.preventDefault();

    if (
      activityName &&
      startTime &&
      selectedDate &&
      selectedActivityType &&
      duration &&
      distance &&
      pace &&
      notes
    ) {
      const activityData = {
        activityName,
        startTime,
        date: selectedDate,
        activityType: selectedActivityType,
        duration,
        distance,
        pace,
        notes,
      };
     

      // Reset form fields after save
      setActivityName("");
      setStartTime("");
      setSelectedDate("");
      setSelectedActivityType("running");
      setDuration("");
      setDistance("");
      setPace("");
      setNotes("");

      navigate("/activityList");
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div>
      <form className="activity-form-container">
        <h3>Log Manually</h3>

        <div className="activity-line">
          <label>Activity Name:</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>Activity Type:</label>
          <select
            value={selectedActivityType}
            onChange={(e) => setSelectedActivityType(e.target.value)}
          >
            <option value="running">Running</option>
            <option value="walk">Walk</option>
            <option value="biking">Biking</option>
          </select>
        </div>

        <div className="activity-line">
          <label>Duration (hh:mm:ss):</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>Distance (km):</label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>Pace (km/hr):</label>
          <input
            type="text"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button className="activity-button" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default ActivityForm;
