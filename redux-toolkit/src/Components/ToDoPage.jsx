import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodosAsync,
  addTaskAsync,
  deleteTaskAsync,
  toggleCompletedAsync,
} from '../redux/todos/asyncActions';
import List from './List';
import Form from './Form';
import Typography from '@mui/material/Typography';

const ToDoPage = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const newTask = {
      id: generateUniqueId(),
      name,
      date,
      completed: false,
    };

    dispatch(addTaskAsync(newTask));
    setName('');
    setDate('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompletedAsync(id));
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <section className="todo-section">
      <div className="container">
        <div className="todo-header">
          <Typography variant="h1" className="todo-title">
            Todo List
          </Typography>
        </div>
        <div className="todo-content">
          <List
            tasks={todos}
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
