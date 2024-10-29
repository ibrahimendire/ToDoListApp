document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage on page load
  loadTasks();

  // Add task button event listener
  addTaskButton.addEventListener("click", addTask);

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTasks();
    taskInput.value = ""; // Clear input
  }

  // Function to create a task element
  function createTaskElement(text) {
    const li = document.createElement("li");
    li.textContent = text;

    // Create complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "✓";
    completeButton.className = "complete";
    completeButton.onclick = () => {
      li.classList.toggle("completed");
      saveTasks();
    };
    li.appendChild(completeButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✕";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(deleteButton);

    return li;
  }

  // Save tasks to local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((taskItem) => {
      tasks.push({
        text: taskItem.textContent.replace(/✓✕/, "").trim(),
        completed: taskItem.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => {
      const taskItem = createTaskElement(task.text);
      if (task.completed) taskItem.classList.add("completed");
      taskList.appendChild(taskItem);
    });
  }
});
