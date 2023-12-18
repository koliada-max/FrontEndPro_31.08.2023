import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

const List = () => {
  const tasks = useSelector((state) => state);

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default List;
