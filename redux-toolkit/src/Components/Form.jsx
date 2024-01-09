import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../redux/todos/asyncActions';

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

    console.log("Логирование новой задачи...");
  dispatch(addTaskAsync(newTask))
    .then((addedTask) => {
      console.log("Новая задача добавлена:", addedTask);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении задачи:", error.message);
    });
    setName('');
    setDate('');

    console.log(addTaskAsync(newTask));
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
