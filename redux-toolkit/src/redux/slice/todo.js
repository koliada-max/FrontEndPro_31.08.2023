// import { createSlice } from '@reduxjs/toolkit';

// const todoSlice = createSlice({
//   name: 'todo',
//   initialState: { tasks: JSON.parse(localStorage.getItem('todo') || '[]') },
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.todo.todo.push(action.payload);
//       console.log(state);
//     },
//     deleteTask: (state, action) => {
//       state.tasks.todo.todo = state.tasks.todo.todo.filter((task) => task.id !== action.payload);
//     },
    
//     toggleCompleted: (state, action) => {
//       state.tasks.todo.todo = state.tasks.todo.todo.map((task) =>
//         task.id === action.payload ? { ...task, completed: !task.completed } : task
//       );
//     },
    
//   },
// });

// const { actions, reducer } = todoSlice

// export const { addTask, deleteTask, toggleCompleted } = actions

// export default reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATE_NAME } from './state';

// API endpoint
const API_ENDPOINT = 'https://659c9546633f9aee7907b74d.mockapi.io/api/tasks/post';

// export const addTaskAsync = createAsyncThunk('todo/addTaskAsync', async (newTask) => {
//   try {
//     const response = await axios.post(`${API_ENDPOINT}`, newTask);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding task:', error.message);
//     throw error;
//   }
// });


export const addTaskAsync = createAsyncThunk(
  `${STATE_NAME}/addTodo`,
  async (name, date) => {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // Send your data in the request body as JSON
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name,
        date,
        completed: false,
      }),
    });
    return await res.json();
  }
);


export const deleteTaskAsync = createAsyncThunk('todo/deleteTaskAsync', async (taskId) => {
  try {
    await axios.delete(`${API_ENDPOINT}/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw error;
  }
});

export const toggleCompletedAsync = createAsyncThunk(
  'todo/toggleCompletedAsync',
  async (taskId) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/tasks/${taskId}`);
      const updatedTask = { ...response.data, completed: !response.data.completed };
      await axios.put(`${API_ENDPOINT}/tasks/${taskId}`, updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Error toggling task completion:', error.message);
      throw error;
    }
  }
);

// add a slice

const todoSlice = createSlice({
  name: 'todo',
  initialState: { tasks: JSON.parse(localStorage.getItem('todo') || '[]') },
  reducers: {
    addTask: (state, action) => {
      state.tasks.todo.todo.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.todo.todo = state.tasks.todo.todo.filter((task) => task.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      state.tasks.todo.todo = state.tasks.todo.todo.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo.push(action.payload);
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo = state.tasks.todo.todo.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleCompletedAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo = state.tasks.todo.todo.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

export const { addTask, deleteTask, toggleCompleted } = todoSlice.actions;

export default todoSlice.reducer;
