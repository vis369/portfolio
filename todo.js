let tasks = [];

function addTask() {
    const description = document.getElementById('taskDescription').value;
    const date = document.getElementById('taskDate').value;
    const state = document.getElementById('taskState').value;

    if (description && date && state) {
        const task = {
            id: Date.now(),
            description: description,
            date: date,
            state: state
        };
        tasks.push(task);
        displayTasks(tasks);
    }
}

function displayTasks(tasksToDisplay) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasksToDisplay.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <span>${task.description} - Due: ${task.date}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskItem);
    });

    checkTasksCompletion();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks(tasks);
}

function filterTasks(state) {
    let filteredTasks;

    if (state === 'all') {
        filteredTasks = tasks;
    } else if (state === 'active') {
        filteredTasks = tasks.filter(task => task.state.toLowerCase() === 'active');
    } else {
        filteredTasks = tasks.filter(task => task.state.toLowerCase() === 'complete');
    }

    displayTasks(filteredTasks);
}

function clearAllTasks() {
    tasks = [];
    displayTasks(tasks);
    congratulateUser();
}

function checkTasksCompletion() {
    const congratsMessage = document.getElementById('congratsMessage');
    if (tasks.length === 0) {
        congratsMessage.style.display = 'block';
    } else {
        congratsMessage.style.display = 'none';
    }
}

function congratulateUser() {
    // Change background color
    document.body.style.backgroundColor = 'green';
    // Show congratulations message
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.style.display = 'block';

    // Reset only the congratulatory message after 3 seconds
    setTimeout(resetCongratsMessage, 3000);
}

function resetCongratsMessage() {
    // Change background color back to original
    document.body.style.backgroundColor = ''; // Resets to the default background
    // Hide congratulations message
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.style.display = 'none';
}
