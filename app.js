const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const incompleteTasksHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskTitle) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskTitle;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTasksHolder.appendChild(listItem);

  taskInput.value = '';
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function (listItem) {
  listItem.remove();
};

const toggleTaskStatus = function (checkBox) {
  const listItem = checkBox.parentNode;
  const targetHolder = checkBox.checked
    ? completedTasksHolder
    : incompleteTasksHolder;
  targetHolder.appendChild(listItem);
};

const handleListInteraction = function (event) {
  const target = event.target;
  const listItem = target.closest('li');

  if (!listItem) return;

  if (target.type === 'checkbox') {
    toggleTaskStatus(target);
    return;
  }

  if (target.closest('.edit')) {
    editTask(listItem);
    return;
  }

  if (target.closest('.delete')) {
    deleteTask(listItem);
    return;
  }
};

addButton.addEventListener('click', addTask);
incompleteTasksHolder.addEventListener('click', handleListInteraction);
completedTasksHolder.addEventListener('click', handleListInteraction);
