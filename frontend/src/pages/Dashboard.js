import React, { useEffect } from "react";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useGoalsContext } from "../hooks/useGoalsContext";
import "../styles/dashboard.css";

const Dashboard = () => {
    const { goals, dispatch } = useGoalsContext();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch("/api/goals");
                const json = await response.json();

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch goals: ${json.error || response.statusText}`
                    );
                }

                dispatch({ type: "SET_GOALS", payload: json });
            } catch (error) {
                console.error("Error fetching goals:", error.message);
            }
        };

        fetchGoals();
    }, [dispatch]);

    const handleDelete = async (goalId) => {
        try {
            const response = await fetch(`/api/goals/${goalId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete goal: ${errorText}`);
            }

            const json = await response.json();

            // Dispatch the action only after successful deletion
            dispatch({ type: "DELETE_GOAL", payload: json });
            console.log("Goal deleted successfully");
        } catch (error) {
            console.error("Error deleting goal:", error.message);
        }
    };

    return (
        <div className="dashboard">
            <div className="goals">
                {goals &&
                    goals.map((goal) => (
                        <GoalDetails
                            key={goal._id}
                            goal={goal}
                            onDelete={handleDelete} // Pass the onDelete function
                        />
                    ))}
            </div>
            <GoalForm />
        </div>
    );
};

export default Dashboard;