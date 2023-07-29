const { JSDOM } = require('jsdom');
import { saveTasks, renderTaskList, editTaskDescription } from './crud.js';

const dom = new JSDOM('<!DOCTYPE html><div><ul class="task-list"></ul></div>');
global.document = dom.window.document;
global.taskList = document.querySelector('.task-list');

const createMockTask = (index, description, completed = false) => {
  return { index, description, completed };
};

describe('Task editing tests', () => {
  test('should update task description and call saveTasks and renderTaskList functions on Enter keydown', () => {
    const mockTask = createMockTask(1, 'Task 1');
    const listElement = document.createElement('li');
    const descriptionElement = document.createElement('span');
    descriptionElement.textContent = mockTask.description;
    listElement.appendChild(descriptionElement);
    taskList.appendChild(listElement);

    editTaskDescription(mockTask);
    const inputElement = listElement.querySelector('input');
    inputElement.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Enter' }));

    expect(mockTask.description).toBe(inputElement.value.trim());
    expect(saveTasks).toHaveBeenCalled();
    expect(renderTaskList).toHaveBeenCalled();
  });

  test('should call renderTaskList function on Escape keydown', () => {
    const mockTask = createMockTask(2, 'Task 2');
    const listElement = document.createElement('li');
    const descriptionElement = document.createElement('span');
    descriptionElement.textContent = mockTask.description;
    listElement.appendChild(descriptionElement);
    taskList.appendChild(listElement);

    editTaskDescription(mockTask);
    const inputElement = listElement.querySelector('input');
    inputElement.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' }));

    expect(renderTaskList).toHaveBeenCalled();
  });
});
