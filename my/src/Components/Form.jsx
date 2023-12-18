import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../actions';

const Form = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    function generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const newTask = {
      id: generateUniqueId(),
      name,
      date,
      completed: false,
    };

    dispatch(addTask(newTask));
    setName('');
    setDate('');
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">
            Task:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Add new Task</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
