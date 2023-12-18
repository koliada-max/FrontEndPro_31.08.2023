import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ToDoPage from './Components/ToDoPage';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className='h-screen w-screen bg-slate-500'>
        <ToDoPage />
      </div>
    </Provider>
  );
};

export default App;
