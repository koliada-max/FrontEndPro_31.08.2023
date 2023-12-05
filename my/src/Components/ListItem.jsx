import React from 'react';

const ListItem = ({ task, handleCheckout, handleDelete }) => {
  const { id, completed, name, date } = task;

  return (
    <div className="todo-item todo">
      <div className={`todo-item todo-block ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleCheckout(id)}
        />
        <div className="todo-info">
          <div className={`task-name ${completed ? 'completed' : ''}`}>
            {name}
          </div>
          <div className="task-date">{date ? date : 'No date'}</div>
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
