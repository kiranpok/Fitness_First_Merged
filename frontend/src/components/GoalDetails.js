import React, { useState } from 'react';
import { useGoalsContext } from '../hooks/useGoalsContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/goaldetails.css';
import { useTranslation } from 'react-i18next';

const GoalDetails = ({ goal, onDelete }) => {
    const { t } = useTranslation();
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
                    <label>{t('goal_edit.name')}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={emptyFields.includes('name') ? 'error' : ''}
                    />
                    <label>{t('goal_edit.distance')} </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className={emptyFields.includes('distance') ? 'error' : ''}
                    />
                    <label>{t('goal_edit.duration')} </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={emptyFields.includes('duration') ? 'error' : ''}
                    />
                    <label>{t('goal_edit.date')} </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={emptyFields.includes('date') ? 'error' : ''}
                    />
                    <button onClick={handleSave}>{t('goal_edit.save_goal')}</button>
                    <button onClick={handleCancel}>{t('goal_edit.cancel')}</button>
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                <>
                    <h4>{goal.title}</h4>
                    <p><strong>{t('goal_details.name')} </strong>{goal.name}</p>
                    <p><strong>{t('goal_details.duration')} </strong>{goal.duration}</p>
                    <p><strong>{t('goal_details.distance')} </strong>{goal.distance}</p>
                    <p><strong>{t('goal_details.date')} </strong>{new Date(goal.date).toLocaleDateString('en-GB')}</p>
                    <button onClick={() => setEditing(true)}><FaEdit /> </button>
                    <button onClick={() => onDelete(goal._id)}><FaTrash /> </button>
                </>
            )}
        </div>
    );
};

export default GoalDetails;
