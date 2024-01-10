import React from 'react';
import { render } from '@testing-library/react';
import TodoListItem from './TodoListItem';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('TodoListItem', () => {
  test('renders todo item correctly', () => {
    const todo = {
      id: 1,
      title: 'Buy groceries',
      completed: false,
    };

    render(
      <Provider store={store}>
        <TodoListItem todo={todo} />
      </Provider>
    );

  });
});
