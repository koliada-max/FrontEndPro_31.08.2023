import React, { Component } from 'react';
import ToDoPage from './Components/Pages/ToDoPage/ToDoPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='h-screen w-screen bg-slate-500'>
        <ToDoPage />
      </div>
    );
  }
}

export default App;
