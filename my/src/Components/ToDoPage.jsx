import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleCompleted } from '../actions';
import List from './List';
import Form from './Form';

const ToDoPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(tasks));
  }, [tasks]);

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

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <section className="todo-section">
      <div className="container">
        <div className="todo-header">
          <h1 className="todo-title">Todo List</h1>
        </div>
        <div className="todo-content">
          <List
            tasks={tasks}
            handleToggleCompleted={handleToggleCompleted}
            handleDelete={handleDelete}
          />
          <Form
            name={name}
            date={date}
            handleSubmit={handleSubmit}
            handleNameChange={setName}
            handleDateChange={setDate}
          />
        </div>
      </div>
    </section>
  );
};

export default ToDoPage;
