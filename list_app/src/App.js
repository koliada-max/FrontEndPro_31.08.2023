import React, { Component, createRef } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: ['JavaScrypt', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS', 'SASS', 'Gulp', 'Webpack', 'Babel', 'Git', 'GitHub', 'VS Code', 'Linux', 'Windows']
    };

    this.inputRef = createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div className="App">
        <h1>List</h1>
        <ul>
          {this.state.products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.focusInput}>Focus input</button>
      </div>
    );
  }
}

export default App;
