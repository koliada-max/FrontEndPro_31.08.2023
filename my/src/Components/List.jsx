import React from 'react';
import ListItem from './ListItem';

const List = ({ tasks, handleToggleCompleted, handleDelete }) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          handleToggleCompleted={handleToggleCompleted}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default List;
