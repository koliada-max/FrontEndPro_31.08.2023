import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';
import { getTodosAsync } from '../redux/todos/asyncActions';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <List className="todo-list">
      {todos?.todo?.todo?.map((task, index) => (
        <React.Fragment key={task.id}>
          <TodoListItem task={task} />
          {index < todos.todo.todo.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TodoList;
