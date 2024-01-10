import React from 'react';
import TodoList from './TodoList';
import Form from './Form';
import Typography from '@mui/material/Typography';

const ToDoPage = () => {
  return (
    <section className="todo-section">
      <div className="container">
        <div className="todo-header">
          <Typography variant="h1" className="todo-title">
            Todo List
          </Typography>
        </div>
        <div className="todo-content">
          <TodoList />
          <Form />
        </div>
      </div>
    </section>
  );
};

export default ToDoPage;
