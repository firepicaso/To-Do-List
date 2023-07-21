import './style.css';

const tasklist = document.querySelector('.task-list');

const tasks = [
  {
    description: 'Listen to podcast',
    completed: true,
    index: 1
  },
  {
    description: 'Daily Exercise',
    completed: true,
    index: 2
  },
];

class Displaytasks {
  static display() {
    tasks.sort((a, b) => a.index - b.index);
    tasklist.innerHTML = '';
    tasks.forEach((task, index) => {
      tasklist.innerHTML += `
        <li class="task" draggable="true">
          <div class="checkbox">
            <input type="checkbox" name="checkbox" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.description}">
          </div>
          <i class="fas fa-ellipsis-vertical" data-index="${index}"></i>
        </li>      
      `;      
    });
  }
}

document.addEventListener('DOMContentLoaded', () =>{
  Displaytasks.display();
});


