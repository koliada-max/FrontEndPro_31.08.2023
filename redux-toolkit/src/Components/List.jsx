import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import { getTodosAsync } from '../redux/todos/asyncActions';

const List = ({ handleToggleCompleted, handleDelete }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.tasks);

  console.log('render list:', todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <div className="todo-list">
      {todos?.todo?.todo?.map((task) => (
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
