const taskList = document.querySelector('.task-list');
let editTaskDescription;
let deleteTask;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const populateTaskLists = (task) => {
    const listElement = document.createElement('li');
    listElement.classList.add('task');
    
    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('checkbox-task-div');

    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = task.completed;
    
    const descriptionElement = document.createElement('span');
    descriptionElement.textContent = task.description;

    const iconElement = document.createElement('i');
    const deleteButton = document.createElement('button');
    
    descriptionElement.addEventListener('click', () => {
        editTaskDescription(task);
    });

    checkBoxDiv.appendChild(checkboxElement);
    checkBoxDiv.appendChild(descriptionElement);

    listElement.appendChild(checkBoxDiv);
  
    iconElement.classList.add('fa', 'fa-ellipsis-v');
    iconElement.addEventListener('click', () => {
        editTaskDescription(task);
        listElement.style.backgroundColor = '#e5e5c9';
        deleteButton.style.display = 'block';
        iconElement.style.display = 'none';
        deleteButton.style.height = '16px';
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

function addNewTask(description) {
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

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

deleteTask = (index) => {
  tasks = tasks.filter((task) => task.index !== index);
  updateIndex();
  saveTasks();
  renderTaskList();
};

const renderTaskList = () => {
  taskList.innerHTML = '';

  tasks
    .sort((task1, task2) => task1.index - task2.index)
    .forEach((task) => {
      const listElement = populateTaskLists(task);
      taskList.appendChild(listElement);
    });
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

export {
  populateTaskLists, addNewTask, updateIndex, saveTasks, renderTaskList
};