import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import { getTodosAsync } from '../redux/todos/asyncActions';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const TodoList = ({ handleToggleCompleted, handleDelete }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks);

  console.log('render list:', todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <List className="todo-list">
      {todos?.todo?.todo?.map((task, index) => (
        <React.Fragment key={task.id}>
          <ListItem
            task={task}
            handleToggleCompleted={handleToggleCompleted}
            handleDelete={handleDelete}
          />
          {index < todos.todo.todo.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TodoList;
