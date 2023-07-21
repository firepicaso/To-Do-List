import './style.css';

const tasklist = document.querySelector('.task-list');

const tasks = [
  {
    description: 'Listen to podcast',
    completed: false,
    index: 1,
  },
  {
    description: 'Daily Exercise',
    completed: false,
    index: 2,
  },
];

class Displaytasks {
  static display() {
    tasks.sort((a, b) => a.index - b.index);
    tasklist.innerHTML = '';
    tasks.forEach((task, index) => {
      tasklist.innerHTML += `
        <li class="task" draggable="true">
          <div class="checkbox-task-div">
            <input class="checkbox" type="checkbox" name="${task.description}" ${task.completed ? 'checked' : ''}>
            <input class="task-text" type="text" value="${task.description}">
          </div>
          <i class="fas fa-ellipsis-vertical" data-index="${index}"></i>
        </li>      
      `;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Displaytasks.display();
});
