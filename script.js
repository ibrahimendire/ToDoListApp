document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
      taskItem.classList.toggle("completed");
    });
    taskItem.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(taskItem);
    });
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
    taskInput.value = "";
  }
});
