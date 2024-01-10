import { render } from '@testing-library/react';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import store from '../redux/store';

test('renders TodoList component', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
});

test('renders correct number of todos', () => {
  const todos = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
    { id: 3, text: 'Todo 3' },
  ];
  
  render(
    <Provider store={store}>
      <TodoList todos={todos} />
    </Provider>
  );
});

test('renders todos with correct text', () => {
  const todos = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
    { id: 3, text: 'Todo 3' },
  ];
  render(
    <Provider store={store}>
      <TodoList todos={todos} />
    </Provider>
  );
});
