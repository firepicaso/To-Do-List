import { taskComplete, taskInComplete } from './status.js';

const taskList = document.querySelector('.task-list');
let editTaskDescription;
let deleteTask;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const populateTaskLists = (task) => {
  const listElement = document.createElement('li');
  listElement.classList.add('task');

  const checkBoxDiv = document.createElement('div');
  checkBoxDiv.classList.add('checkbox-task-div');

  const checkboxElement = document.createElement('input');
  checkboxElement.type = 'checkbox';
  checkboxElement.checked = task.completed;

  checkboxElement.addEventListener('change', () => {
    if (checkboxElement.checked) {
      taskComplete(task);
    } else {
      taskInComplete(task);
    }
    saveTasks();
  });

  const descriptionElement = document.createElement('span');
  descriptionElement.classList.add('task-description');
  descriptionElement.textContent = task.description;

  const iconElement = document.createElement('i');
  const deleteButton = document.createElement('button');

  checkBoxDiv.appendChild(checkboxElement);
  checkBoxDiv.appendChild(descriptionElement);

  listElement.appendChild(checkBoxDiv);

  iconElement.classList.add('fa', 'fa-ellipsis-vertical');
  iconElement.addEventListener('click', () => {
    editTaskDescription(task);
    listElement.style.backgroundColor = '#e5e5c9';
    iconElement.style.display = 'none';
    deleteButton.style.display = 'flex';
  });

  listElement.appendChild(iconElement);

  deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
  deleteButton.classList.add('delete-button');
  deleteButton.style.display = 'none';

  deleteButton.addEventListener('click', () => {
    deleteTask(task.index);
  });

  listElement.appendChild(deleteButton);

  return listElement;
};

export function addNewTask(description) {
  const taskIndex = tasks.length + 1;

  const task = { description, completed: false, index: taskIndex };
  tasks.push(task);
  saveTasks();
  const listElement = populateTaskLists(task);
  taskList.appendChild(listElement);
}

const updateIndex = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

export const renderTaskList = () => {
  taskList.innerHTML = '';

  tasks
    .sort((task1, task2) => task1.index - task2.index)
    .forEach((task) => {
      const listElement = populateTaskLists(task);
      taskList.appendChild(listElement);
    });
};

deleteTask = (index) => {
  tasks = tasks.filter((task) => task.index !== index);
  updateIndex();
  saveTasks();
  renderTaskList();
};

editTaskDescription = (task) => {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = task.description;
  inputElement.classList.add('edit-input');

  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      task.description = inputElement.value.trim();
      saveTasks();
      renderTaskList();
    } else if (event.key === 'Escape') {
      renderTaskList();
    }
  });

  const listElement = taskList.children[task.index -= 1];
  listElement.replaceChild(inputElement, listElement.children[1]);
  inputElement.select();
  task.index += 1;
};

const clearTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
  updateIndex();
  saveTasks();
  renderTaskList();
};

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', () => {
  clearTasks();
});
