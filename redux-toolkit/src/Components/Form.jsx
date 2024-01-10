import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../redux/todos/asyncActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
  
    console.log("Logging a new task...");
    dispatch(addTaskAsync(newTask))
      .then((addedTask) => {
        console.log("New task added:", addedTask);
      })
      .catch((error) => {
        console.error("Error adding task:", error.message);
      });
    setName('');
    setDate('');
  };
  
  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Task"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Add new Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
