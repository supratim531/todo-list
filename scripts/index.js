let todos = [
  {
    title: "Title 1",
    description: "This is a long description 1",
    marked: false,
  },
  {
    title: "Title 2",
    description: "This is a long description 2",
    marked: true,
  },
  {
    title: "Title 3",
    description: "This is a long description 3",
    marked: false,
  },
];

const renderTodos = () => {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoListItemElement = document.createElement("li");
    todoListItemElement.innerHTML = `
    <li class="p-2 space-y-3 rounded-sm bg-[#efc8b1]">
      <section class="flex flex-col gap-2">
        <h3 class="font-semibold text-[2rem] text-[#514644] ${
          todo.marked ? "line-through" : "normal-case"
        }">${index + 1}. ${todo.title}</h3>
        <p class="${todo.marked ? "line-through" : "normal-case"}">${
      todo.description
    }</p>
  
        <div>
          <input class="cursor-pointer" type="checkbox" id="${
            "Mark" + todo.title
          }" ${todo.marked ? "checked" : null}>
          <label class="cursor-pointer" for="${
            "Mark" + todo.title
          }">Mark as Done</label>
        </div>
      </section>
      <section class="flex justify-between items-center">
        <button class="px-2.5 py-1.5 rounded border border-white text-2xl text-[#514644] bg-opacity-50 bg-gray-600">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="px-2.5 py-1.5 rounded border border-white text-2xl text-[#514644] bg-opacity-50 bg-gray-600">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </section>
    </li>
    `;

    const updateButton = todoListItemElement.querySelectorAll("button")[0];
    const deleteButton = todoListItemElement.querySelectorAll("button")[1];
    const markInputElement = todoListItemElement.querySelectorAll(
      "input[type='checkbox']"
    )[0];

    markInputElement.addEventListener("click", () => {
      todos[index].marked = !todos[index].marked;
      renderTodos();
    });

    updateButton.addEventListener("click", () => {
      const newTitle = prompt("Update Title:", todo.title);

      if (newTitle) {
        todos[index].title = newTitle.trim();
        renderTodos();
      }

      const newDescription = prompt("Update Description:", todo.description);

      if (newDescription) {
        todos[index].description = newDescription.trim();
        renderTodos();
      }
    });

    deleteButton.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
        todos.splice(index, 1);
        renderTodos();
      }
    });

    todoListElement.appendChild(todoListItemElement);
  });
};

renderTodos();
