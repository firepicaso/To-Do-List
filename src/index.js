import './style.css';
import { renderTaskList, addNewTask } from './module/crud.js';

const newTask = document.querySelector('.task-input');
const form = document.querySelector('.task-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskDescription = newTask.value;
  if (taskDescription.trim() === '') {
    return;
  }

  addNewTask(taskDescription);
  newTask.value = '';
});

window.addEventListener('load', renderTaskList);
