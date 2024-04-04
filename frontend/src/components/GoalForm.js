import React, { useState } from 'react';
import { useGoalsContext } from '../hooks/useGoalsContext';
import '../styles/goalform.css';
import { useTranslation } from "react-i18next";

const GoalForm = () => {
    const { t } = useTranslation();
    const { dispatch } = useGoalsContext();
    const [name, setName] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false); // Track form visibility state

    const handleSubmit = async (e) => {
        e.preventDefault();

        const goal = {
            name,
            distance,
            duration,
            date,
        };

        const response = await fetch('/api/goals', {
            method: 'POST',
            body: JSON.stringify(goal),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields ? json.emptyFields : []);
            return;
        }

        setName('');
        setDistance('');
        setDuration('');
        setDate('');
        setError(null);
        setEmptyFields([]);
        console.log('New goal added successfully', json);
        dispatch({ type: 'CREATE_GOAL', payload: json });

        // Close the form after successful submission
        setFormVisible(false);
    };

    const handleCancel = () => {
        // Clear form fields and close the form
        setName('');
        setDistance('');
        setDuration('');
        setDate('');
        setError(null);
        setEmptyFields([]);
        setFormVisible(false);
    };

    return (
        <>
            <button onClick={() => setFormVisible(true)}>{t('goal_form.button_name')}</button>
            {isFormVisible && (
                <form className="goal-form" onSubmit={handleSubmit}>
                    <h3>{t('goal_form.title')}</h3>
                    <label>{t('goal_form.goal_name')}</label>
                    <input
                        type="text"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className={emptyFields.includes('name') ? 'error' : ''}
                    />
                    <label>{t('goal_form.distance')} </label>
                    <input
                        type="number"
                        placeholder=""
                        onChange={(e) => setDistance(e.target.value)}
                        value={distance}
                        className={emptyFields.includes('distance') ? 'error' : ''}
                    />
                    <label>{t('goal_form.duration')} </label>
                    <input
                        type="number"
                        placeholder=""
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                        className={emptyFields.includes('duration') ? 'error' : ''}
                    />
                    <label>{t('goal_form.date')} </label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className={emptyFields.includes('date') ? 'error' : ''}
                    />
                    <button type="submit">{t('goal_form.save_goal')}</button>
                    <button type="button" onClick={handleCancel}>{t('goal_form.cancel')}</button>
                    {error && <p className="error">{error}</p>}
                </form>
            )}
        </>
    );
};

export default GoalForm;