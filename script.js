// Retrieve todos from localStorage; if none exist, initialize as empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; // Default filter is "all"

// Function to save the current todos array to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos on the page based on current filter
function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = ""; // Clear existing list

  // Filter todos according to current filter: all, completed, or pending
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "pending") return !todo.completed;
    return true; // Return all todos if filter is "all"
  });

  // Create list items for each filtered todo
  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed"); // Apply completed styling
    }

    // Set inner HTML for each todo with text and action buttons
    li.innerHTML = `
      <div class="todo-content">
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="todo-actions">
        <button onclick="toggleTodo(${index})" class="action-btn complete-btn">
          <i class="fas ${todo.completed ? "fa-rotate-left" : "fa-check"}"></i>
        </button>
        <button onclick="deleteTodo(${index})" class="action-btn delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    // Append the list item to the todo list
    todoList.appendChild(li);
  });
}

// Function to add a new todo to the list
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim(); // Remove extra whitespace

  if (text) {
    // Push new todo object to array
    todos.push({
      text: text,
      completed: false,
    });

    input.value = ""; // Clear input field
    saveTodos();      // Save updated todos to localStorage
    renderTodos();    // Re-render the todo list
  }
}

// Function to toggle completion status of a todo
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed; // Toggle completed flag
  saveTodos();    // Update localStorage
  renderTodos();  // Re-render list to reflect changes
}

// Function to delete a todo from the list
function deleteTodo(index) {
  todos.splice(index, 1); // Remove todo at specified index
  saveTodos();             // Update localStorage
  renderTodos();           // Re-render list
}

// Event listener to add todo when pressing "Enter" key in input field
document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Event listener for filter buttons (All, Completed, Pending)
document.querySelector(".filters").addEventListener("click", function (e) {
  const filterBtn = e.target.closest(".filter-btn");
  if (!filterBtn) return; // Ignore clicks outside buttons

  // Remove 'active' class from all filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add 'active' class to the clicked filter button
  filterBtn.classList.add("active");

  // Update current filter and re-render todos accordingly
  currentFilter = filterBtn.dataset.filter;
  renderTodos();
});

// Initial render when page loads
renderTodos();
