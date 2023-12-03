import React, { Component } from 'react';
import InputRef from './InputRef';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: ['JavaScrypt', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS', 'SASS', 'Gulp', 'Webpack', 'Babel', 'Git', 'GitHub', 'VS Code', 'Linux', 'Windows']
    };
  }

  render() {
    return (
      <div className="App">
        <h1>List</h1>
        <ul>
          {this.state.products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
        <InputRef />
      </div>
    );
  }
}

export default App;
