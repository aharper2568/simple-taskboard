// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// TODO: create a function to generate a unique task id
function generateTaskId() {
  let nextId = JSON.parse(localStorage.getItem(nextId));
  // if nextId does not exist in localStorage, set it to 1
if (nextId === null) {
  nextId =1; } else { nextId += 1; 
}
  // otherwise, increment it by 1
  localStorage.setItem('nextId', JSON.stringify(nextId));

  // save nextId to localStorage
  return nextId;
}

// TODO: create a function to create a task card
function createTaskCard(task) {
  // create card elements
  const cardEl = $('<div>').addClass('task-card');
  const titleEl = $('<h3>').text(task.title);
  const dueDateEl = $('<h2>').text(task.dueDate);
  const descriptionEl = $('<p>').text(task.description);
  const deleteButtonEl = $('<button>').addClass('delete-task btn btn-danger').text('Delete');


    // set card background color based on due date
    const now = dayjs(); // Get the current date
    const dueDate = dayjs(task.dueDate); // Convert task due date to dayjs object
  
    if (now.isSame(dueDate, 'day')) {
      cardEl.addClass('bg-warning text-white');
    } else if (now.isAfter(dueDate, 'day')) {
      cardEl.addClass('bg-danger text-white'); // Task is overdue
    } else if (now.isBefore(dueDate, 'day')) {
      cardEl.addClass('bg-info text-white'); // Task is not yet due
    }


  // append card elements
  cardEl.append(titleEl, dueDateEl, descriptionEl, deleteButtonEl);

  return cardEl;
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {
  // if taskList is null, set it to an empty array
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  // empty existing task cards
  $('#todo-cards').empty();
  $('#in-progress-cards').empty();
  $('#done-cards').empty();
  // loop through tasks and create task cards for each status
taskList.forEach(task => {
  const taskCard = createTaskCard(task);
  $(`#${task.status}--cards`).append(taskCard);
});
  // make task cards draggable

  $('.task-card').draggable({
    revert: 'invalid',
    stack: '.task-card',
    cursor: 'move'
  })
}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
  // create a new task object
  event.preventDefault();
  const title = $('#task-title').val();
  const dueDate = $('#datepicker').val();
  const description = $('#description').val();
  const id = generateTaskId();
  const newTask = {
    id,
    title,
    dueDate,
    description,
    status: 'to-do'
  };

  taskList.push(newTask);
  
  // add the new task to the taskList save and render
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
  // get the task id from the button clicked
const taskId = $(event.target).closest('.task-card').data('id');
  // remove the task from the taskList, save and render
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // get the task id and new status from the event

  // update the task status of the dragged card

  // save and render
}

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // render the task list

  // add event listener

  // make lanes droppable

  // make due date field a date picker
});
