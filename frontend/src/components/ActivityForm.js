import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/activityform.css";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

const ActivityForm = () => {
  const { t } = useTranslation();
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState("running");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSave = async (e) => {
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

      // Send the form data to a server
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
        <h3>{t("activity_form.title")}</h3>

        <div className="activity-line">
          <label>{t("activity_form.name")}</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>{t("activity_form.start_time")}</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label>{t("activity_from.date")}</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>{t("activity_form.activity_type")}</label>
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
          <label>{t("activity_form.duration")}</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>{t("activity_form.distance")}</label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>{t("activity_form.pace")}</label>
          <input
            type="text"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
          />
        </div>

        <div className="activity-line">
          <label>{t("activity_form.notes")}</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button className="activity-button" type="button" onClick={handleSave}>
          {t("activity_form.save")}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default ActivityForm;
