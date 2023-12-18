import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleted } from '../actions';

const ListItem = ({ task }) => {
  const dispatch = useDispatch();
  const { id, completed, name, date } = task;

  return (
    <div className="todo-item todo">
      <div className={`todo-item todo-block ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleCompleted(id))}
        />
        <div className="todo-info">
          <div className={`task-name ${completed ? 'completed' : ''}`}>{name}</div>
          <div className="task-date">{date ? date : 'No date'}</div>
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={() => dispatch(deleteTask(id))}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
