import React from "react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const ActivityStats = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetchActivityData().then((data) => setActivityData(data));
  }, []);

  const fetchActivityData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/activities/getAll"
      );
      const data = await response.json();

      // Log the duration for each activity
      data.forEach((activity) => {
        console.log(
          `Duration for activity on ${activity.date}: ${activity.duration}`
        );
      });

      // Calculate the total distance, duration, and number of activities for each day
      const totalActivities = data.length;

      // add the total activities to each activity
      const activitiesWithTotal = data.map((activity) => ({
        ...activity,
        totalActivities,
      }));

      return activitiesWithTotal;
    } catch (error) {
      console.error("Error fetching activities:", error.message);
      return [];
    }
  };

  const convertDurationToHours = (duration) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const distanceData = {
    labels: activityData.map((activity) => formatDate(activity.date)),
    datasets: [
      {
        label: "Distance (km)",
        data: activityData.map((activity) => activity.distance),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const durationData = {
    labels: activityData.map((activity) => formatDate(activity.date)),
    datasets: [
      {
        label: "Duration (hours)",
        data: activityData.map((activity) =>
          convertDurationToHours(activity.duration)
        ),
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const totalActivitiesData = {
    labels: activityData.map((activity) => formatDate(activity.date)),
    datasets: [
      {
        label: "Total Activities",
        data: activityData.map((activity) => activity.totalActivities),
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <h2>Activity Stats for the Last 7 Days</h2>
      <div>
        <Bar data={distanceData} options={options} id="distanceChart" />
      </div>
      <div>
        <Bar data={durationData} options={options} id="durationChart" />
      </div>
      <div>
        <Bar
          data={totalActivitiesData}
          options={options}
          id="totalActivitiesChart"
        />
      </div>
    </div>
  );
};

export default ActivityStats;
