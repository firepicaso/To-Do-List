export const taskComplete = (task) => {
  task.completed = true;
};

export const taskInComplete = (task) => {
  task.completed = false;
};