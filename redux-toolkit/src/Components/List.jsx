import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

const List = ({ handleToggleCompleted, handleDelete }) => {
  const todos = useSelector((state) => state.todo.tasks);
  console.log(todos);
  return (
    <div className="todo-list">
      {todos.todo.todo.map((task) => (
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