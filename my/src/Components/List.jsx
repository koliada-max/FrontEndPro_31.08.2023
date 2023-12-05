import React from 'react';
import ListItem from './ListItem';

const List = ({ tasks, handleCheckout, handleDelete }) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          handleCheckout={handleCheckout}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default List;
