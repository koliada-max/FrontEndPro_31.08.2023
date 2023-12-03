import React, { Component, createRef } from 'react';

class InputRef extends Component {
  constructor() {
    super();
    this.inputRef = createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <h1>Focus input</h1>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.focusInput}>Click</button>
      </div>
    );
  }
}

export default InputRef;
