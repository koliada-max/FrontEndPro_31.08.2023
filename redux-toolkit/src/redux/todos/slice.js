import { createSlice } from '@reduxjs/toolkit';
import {
  getTodosAsync,
  addTaskAsync,
  deleteTaskAsync,
  toggleCompletedAsync,
} from './asyncActions';

import { initialState, STATE_NAME } from './state';

const todoSlice = createSlice({
  name: STATE_NAME,
  initialState,

  reducers: {
    getTasks: (state, action) => {
      state.tasks.todo.todo = action.payload;
      localStorage.setItem('todo', JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks.todo.todo.push(action.payload);
      return state;
    },
    deleteTask: (state, action) => {
      state.tasks.todo.todo = state.tasks.todo.todo.filter(
        (task) => task.id !== action.payload
      );
    },
    toggleCompleted: (state, action) => {
      state.tasks.todo.todo = state.tasks.todo.todo.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo = action.payload;
        localStorage.setItem('todo', JSON.stringify(state.tasks));
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo.push(action.payload);
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo = state.tasks.todo.todo.filter(
          (task) => task.id !== action.payload
        );
      })
      .addCase(toggleCompletedAsync.fulfilled, (state, action) => {
        state.tasks.todo.todo = state.tasks.todo.todo.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

export const { getTasks, addTask, deleteTask, toggleCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
