import React from 'react';

const Form = (props) => {
  const { name, date, handleSubmit, handleNameChange, handleDateChange } = props;

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">
            Task:
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Add new Task</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
