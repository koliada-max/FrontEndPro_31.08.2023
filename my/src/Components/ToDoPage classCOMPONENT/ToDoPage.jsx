import React, { Component } from 'react';
// import './style.css';

class ToDoPage extends Component {
  constructor() {
    super();

    const taskData = JSON.parse(localStorage.getItem('todo') || '[]');

    this.state = {
      tasks: taskData.map((task) => ({ ...task, completed: false })),
      name: '',
      date: '',
      editTaskId: null,
      editName: '',
      editDate: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, date, tasks, editTaskId } = this.state;

    if (!name.trim()) {
      return;
    }

    function generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const newTask = {
      id: generateUniqueId(),
      name,
      date,
      completed: false,
    };

    if (editTaskId !== null) {
      this.handleEdit(editTaskId, name, date);
      this.setState({
        editTaskId: null,
        editName: '',
        editDate: '',
      });
    } else {
      this.setState({
        tasks: [...tasks, newTask],
        name: '',
        date: '',
      });
    }
  };

  handleEdit = (id, name, date) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, name, date } : task
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  handleEditButtonClick = (id, name, date) => {
    this.setState({
      editTaskId: id,
      editName: name,
      editDate: date,
    });
  };

  handleToggleCompleted = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('todo', JSON.stringify(this.state.tasks));
  }

  render() {
    const { tasks, name, date, editTaskId, editName, editDate } = this.state;

    return (
      <>
        <section className="todo-section">
          <div className="container">
            <div className="todo-header">
              <h1 className="todo-title">Todo List</h1>
            </div>
            <div className="todo-content">
              <div className="todo-list">
                {tasks.map((task) => (
                  <div key={task.id} className="todo-item todo">
                    <div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => this.handleToggleCompleted(task.id)}
                      />
                      {editTaskId === task.id ? (
                        <>
                          <input
                            className={`todo-item todo-block ${
                              task.completed ? 'completed' : ''
                            }`}
                            type="text"
                            value={editName}
                            onChange={(e) =>
                              this.setState({ editName: e.target.value })
                            }
                          />
                          <input
                            type="date"
                            value={editDate}
                            onChange={(e) =>
                              this.setState({ editDate: e.target.value })
                            }
                          />
                          <div className="button-group">
                            <button
                              type="button"
                              onClick={() => {
                                this.handleEdit(task.id, editName, editDate);
                                this.setState({
                                  editTaskId: null,
                                  editName: '',
                                  editDate: '',
                                });
                              }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({
                                  editTaskId: null,
                                  editName: '',
                                  editDate: '',
                                })
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="todo-info">
                          <div
                            className={`task-name ${
                              task.completed ? 'completed' : ''
                            }`}
                          >
                            {task.name}
                          </div>
                          <div className="task-date">
                            {task.date ? task.date : 'No date'}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="button-group">
                      <button
                        type="button"
                        onClick={() =>
                          this.handleEditButtonClick(
                            task.id,
                            task.name,
                            task.date
                          )
                        }
                        disabled={task.completed}
                        className={task.completed ? 'hidden' : ''}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="todo-form">
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label className="form-label">
                      Task:
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
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
                        onChange={(e) =>
                          this.setState({ date: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit">Add new Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ToDoPage;
