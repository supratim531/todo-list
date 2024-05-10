let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

todos.push({
  title: "_dummy",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed quo, odit perferendis velit cupiditate explicabo tempora quisquam facere distinctio dignissimos blanditiis vel in voluptatem expedita exercitationem amet voluptatum nulla nihil.",
  marked: true,
});

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
        }">${todo.title === "_dummy" ? ".." : index + 1}. ${todo.title}</h3>
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

    const updateButtonElement =
      todoListItemElement.querySelectorAll("button")[0];
    const deleteButtonElement =
      todoListItemElement.querySelectorAll("button")[1];
    const markInputElement = todoListItemElement.querySelectorAll(
      "input[type='checkbox']"
    )[0];

    markInputElement.addEventListener("click", () => {
      todos[index].marked = !todos[index].marked;
      renderTodos();
    });

    updateButtonElement.addEventListener("click", () => {
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

    deleteButtonElement.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
        todos.splice(index, 1);
        renderTodos();
      }
    });

    todoListElement.appendChild(todoListItemElement);
  });

  if (todos.length === 0) {
    const todoListItemElement = document.createElement("li");
    todoListItemElement.innerHTML = `
      <h2 class="heading">No Todos</h2>
      `;
    todoListElement.appendChild(todoListItemElement);
  }

  localStorage.setItem(
    "todos",
    JSON.stringify(todos.filter((todo) => todo.title !== "_dummy"))
  );
};

renderTodos();

const formElement = document.querySelectorAll("form")[0];
const inputElement = formElement.querySelector("input");
const textareaElement = formElement.querySelector("textarea");
const submitButtonElement = document.querySelectorAll("form > button")[0];

submitButtonElement.addEventListener("click", (event) => {
  if (inputElement.value && textareaElement.value) {
    event.preventDefault();
    const newTodo = {
      title: inputElement.value.trim(),
      description: textareaElement.value.trim(),
    };
    todos.push(newTodo);
    renderTodos();
    inputElement.value = "";
    textareaElement.value = "";
  }
});
