import React, { useState } from 'react';
import { useGoalsContext } from '../hooks/useGoalsContext';


const GoalDetails = ({ goal, onDelete }) => {
    const { dispatch } = useGoalsContext();
    const [isEditing, setEditing] = useState(false);
    const [name, setName] = useState(goal.name);
    const [distance, setDistance] = useState(goal.distance);
    const [duration, setDuration] = useState(goal.duration);
    const [date, setDate] = useState(goal.date);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSave = async () => {
        const updatedGoal = {
            ...goal,
            name,
            distance,
            duration,
            date,
        };

        try {
            const response = await fetch(`/api/goals/${goal._id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedGoal),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
                setEmptyFields(json.emptyFields ? json.emptyFields : []);
                return;
            }

            dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
            setEditing(false);
        } catch (error) {
            console.error('Error updating goal:', error.message);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        // Reset form fields to the original goal values
        setName(goal.name);
        setDistance(goal.distance);
        setDuration(goal.duration);
        setDate(goal.date);
    };

    return (
        <div className="goal">
            {isEditing ? (
                <>
                    <h4>{goal.title}</h4>
                    <label>Goal Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={emptyFields.includes('name') ? 'error' : ''}
                    />
                    <label>Distance (km): </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className={emptyFields.includes('distance') ? 'error' : ''}
                    />
                    <label>Duration (h): </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={emptyFields.includes('duration') ? 'error' : ''}
                    />
                    <label>Date: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={emptyFields.includes('date') ? 'error' : ''}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                <>
                    <h4>{goal.title}</h4>
                    <p><strong>Name: </strong>{goal.name}</p>
                    <p><strong>Duration (h): </strong>{goal.duration}</p>
                    <p><strong>Distance (km): </strong>{goal.distance}</p>
                    <p><strong>Date: </strong>{new Date(goal.date).toLocaleDateString('en-GB')}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(goal._id)}>Delete</button>
                </>
            )}
        </div>
    );
};

export default GoalDetails;