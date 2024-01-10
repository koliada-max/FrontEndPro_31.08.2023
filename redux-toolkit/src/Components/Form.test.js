// unit test for Form component
import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('Form', () => {

  test('renders the component', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });

  test('renders the correct input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });

  test('renders the correct button', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });

}
);