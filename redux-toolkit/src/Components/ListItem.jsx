import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, toggleCompletedAsync } from '../redux/todos/asyncActions';

const ListItem = ({ task }) => {
  const dispatch = useDispatch();
  const { id, completed } = task;
  const { name, date } = task;

  const taskName = name && typeof name === 'object' ? name.name : 'No name';
  const taskDate = date && typeof date === 'object' ? date.date : 'No date';

  const handleToggleCompleted = () => {
    dispatch(toggleCompletedAsync({ taskId: id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskAsync(id));
  };

  return (
    <div className="todo-item todo">
      <div className={`todo-item todo-block ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleCompleted}
        />
        <div className="todo-info">
          <div className={`task-name ${completed ? 'completed' : ''}`}>
            {taskName}
          </div>
          <div className="task-date">{taskDate}</div>
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
