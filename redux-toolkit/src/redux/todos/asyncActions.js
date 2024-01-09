import { createAsyncThunk } from '@reduxjs/toolkit';
import { STATE_NAME } from './state';
import { deleteTask } from './slice';

// API endpoint
const API_ENDPOINT = 'https://659c9546633f9aee7907b74d.mockapi.io/api/tasks/post';

export const getTodosAsync = createAsyncThunk(
  `${STATE_NAME}/todo/getTodos`,
  async (arg, thunkApi) => {
    console.log('arg is:', arg);
    console.log('thunkApi', thunkApi);
    const res = await fetch(API_ENDPOINT);
    return await res.json();
  }
);


export const addTaskAsync = createAsyncThunk(
  `${STATE_NAME}/todo/addTodo`,
  async (name, date) => {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
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

export const deleteTaskAsync = createAsyncThunk(
  `${STATE_NAME}/todo/deleteTaskAsync`,
  async (taskId, { dispatch }) => {
    try {
      dispatch(deleteTask(taskId));
      const res = await fetch(`${API_ENDPOINT}/${taskId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete task');
      }
      return taskId;
    } catch (error) {
      console.error('Error deleting task:', error.message);
      throw error;
    }
  }
);

export const toggleCompletedAsync = createAsyncThunk(
  `${STATE_NAME}/todo/toggleCompletedAsync`,
  async ({ taskId, completed }) => {
    const res = await fetch(`${API_ENDPOINT}/${taskId}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    return await res.json();
  }
);