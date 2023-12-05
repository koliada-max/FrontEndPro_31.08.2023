import React, { useState, useEffect } from 'react';
import List from './List';
import Form from './Form';

const ToDoPage = () => {
  
  const taskData = JSON.parse(localStorage.getItem('todo') || '[]');

  const [tasks, setTasks] = useState(taskData);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');

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

    if (name !== '') {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        console.log('Tasks updated:', updatedTasks);
        return updatedTasks;
      });
      setName('');
      setDate('');
    }
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleCheckout = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <section className="todo-section">
        <div className="container">
          <div className="todo-header">
            <h1 className="todo-title">Todo List</h1>
          </div>
          <div className="todo-content">
            <List
              tasks={tasks}
              handleCheckout={handleCheckout}
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
    </>
  );
};

export default ToDoPage;
