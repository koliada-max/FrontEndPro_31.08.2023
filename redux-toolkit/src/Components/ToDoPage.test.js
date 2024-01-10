import React from 'react';
import { render } from '@testing-library/react';
import ToDoPage from './ToDoPage';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import the store


describe('ToDoPage', () => {
  test('renders the component', () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    );
  });
});
