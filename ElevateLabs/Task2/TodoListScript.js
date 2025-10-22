// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");

// Tasks array to store all tasks
let tasks = [];

// Initialize app
function init() {
  updateUI();
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  taskInput.focus();
  updateUI();
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateUI();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateUI();
}

// Update the UI
function updateUI() {
  // Clear the list
  taskList.innerHTML = "";

  // Show/hide empty state
  if (tasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  // Render tasks
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    // Create checkbox
    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    checkbox.addEventListener("click", () => toggleTask(task.id));

    // Create task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);

    // Append list item to task list
    taskList.appendChild(li);
  });

  // Update statistics
  updateStats();
}

// Update task statistics
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
}

// Start the app
init();
