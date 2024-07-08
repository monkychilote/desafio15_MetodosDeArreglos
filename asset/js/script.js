document.addEventListener("DOMContentLoaded", () => {
  let tasks = [
    { id: 1, description: "Hacer mercado", completed: false },
    { id: 2, description: "Estudiar para la prueba", completed: false },
    { id: 3, description: "Sacar a pasear a Tobby", completed: false },
  ];

  const taskList = document.getElementById("task-list");
  const totalTasks = document.getElementById("total-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  const newTaskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const taskRow = document.createElement("tr");
      taskRow.innerHTML = `
                <td>${task.id}</td>
                <td class="${task.completed ? "completed" : ""}">${
        task.description
      }</td>
                <td>
                    <input type="checkbox" ${
                      task.completed ? "checked" : ""
                    } onclick="toggleTask(${task.id})">
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${
                      task.id
                    })">Borrar</button>
                </td>
            `;
      taskList.appendChild(taskRow);
    });
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter((task) => task.completed).length;
  };

  const addTask = () => {
    const description = newTaskInput.value.trim();
    if (description) {
      const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
      tasks.push({ id, description, completed: false });
      newTaskInput.value = "";
      renderTasks();
    }
  };

  const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  };

  const toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
  };

  addTaskButton.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  renderTasks();

  // Hacer que las funciones sean accesibles globalmente
  window.deleteTask = deleteTask;
  window.toggleTask = toggleTask;
});
