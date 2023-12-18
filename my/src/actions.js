export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const toggleCompleted = (id) => ({
  type: 'TOGGLE_COMPLETED',
  payload: id,
});
