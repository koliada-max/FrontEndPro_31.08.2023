// src/Components/ListItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, toggleCompletedAsync } from '../redux/todos/asyncActions';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

const TodoListItem = ({ task }) => {
  const dispatch = useDispatch();
  const { name, date, id, completed } = task;

  const taskName = name && typeof name === 'object' ? name.name : 'No name';
  const taskDate = date && typeof date === 'object' ? name.date : 'No date';

  return (
    <ListItem
      className={`todo-item todo ${completed ? 'completed' : ''}`}
      alignItems="flex-start"
    >
      <Checkbox
        checked={completed}
        onChange={() => dispatch(toggleCompletedAsync({ taskId: id, completed: !completed }))}
      />
      <ListItemText>
        <div className={`task-name ${completed ? 'completed' : ''}`}>
          {taskName}
        </div>
        <div className="task-date">{taskDate}</div>
      </ListItemText>
      <div className="button-group">
        <Button onClick={() => dispatch(deleteTaskAsync(id))} variant="outlined">
          Delete
        </Button>
      </div>
    </ListItem>
  );
};

export default TodoListItem;
