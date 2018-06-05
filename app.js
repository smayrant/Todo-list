// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listeners
const loadEventListeners = () => {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask)
  // clear task event
  clearButton.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
const getTasks = () => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((tasks) => {
    // create li element
    const li = document.createElement('li')
    // add class to li element
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(tasks))
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  })
}


// add task function
const addTask = (e) => {
  if (taskInput.value === '') {
    alert('Please input a task')
  }

  // create li element
  const li = document.createElement('li')
  // add class to li element
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // store task in local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  // prevent form from submitting
  e.preventDefault();
}

// Store tasks
const storeTaskInLocalStorage = (task) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // the task value passed in is pushed onto the array
  tasks.push(task);
  // the value from the tasks array is converted to string and stored in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove tasks
const removeTask = (e) => {
  // if what was clicked is the link that was created above...
  if (e.target.parentElement.classList.contains('delete-item')) {
    // delete parent el (li) of parent el (link) of (fa icon)
    if (confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();

      // remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from local storage
const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
const clearTasks = () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from local storage
  clearTasksFromLocalStorage();
}

// clear tasks from local storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
}

// filter tasks
const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// load event listeners
loadEventListeners();
