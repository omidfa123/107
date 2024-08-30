const submitBtn = document.getElementById("submit-btn");
const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.getElementById("moz-form");
const todoContainer = document.getElementById("todo-container");

// toto {title : "mamad"  , description : "mmassd"  , id: "" , isDone : true}

let todoList = [];
let id = 1;
let isEdit = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target["title"].value;
  const descriptionValue = event.target["description"].value;

  if (!titleValue || !descriptionValue) return;

  if (isEdit) {
    todoList.forEach((todo) => {
      if (todo.id === isEdit) {
        todo.title = titleValue;
        todo.description = descriptionValue;
        submitBtn.textContent = "تودو موز +";
      }
    });
  } else {
    todoList.push({
      title: titleValue,
      description: descriptionValue,
      id: id,
      isDone: false,
    });
    id++;
  }
  form.reset();
  renderTodo(todoList);
});

function renderTodo(todoList) {
  todoContainer.innerHTML = "";
  todoList.forEach((todo) => {
    const todoCard = `<figure
              class="shadow-sm rounded-2xl bg-white text-black px-4 py-5 border-2 border-dashed border-amber-500 max-w-[320px] z-10 relative"
            >
              <ul class="space-y-4 flex flex-col h-full">
                <li>
                  <span class="text-lg font-bold">عنوان :</span>
                  <span>${todo.title}</span>
                </li>
                <li class="flex-1">
                  <span class="text-lg font-bold">توضیحات :</span>
                  <span class="line-clamp-2" title=${todo.description}>${todo.description}</span>
                </li>
                <li class="flex justify-between px-4 pt-4">
                  <button onClick={handleDelete(${todo.id})}>delete</button>
                  <button onClick={handleEdit(${todo.id})}>edit</button>
                  <button>done</button>
                </li>
              </ul>
            </figure>
  `;

    todoContainer.innerHTML += todoCard;
  });
}

const handleDelete = function (id) {
  console.log(id);
  todoList = todoList.filter((todo) => todo.id !== id);
  renderTodo(todoList);
  console.log("todolist", todoList);
};

const handleEdit = (id) => {
  const editTodo = todoList.find((todo) => todo.id === id);
  isEdit = editTodo.id;
  title.value = editTodo.title;
  description.value = editTodo.description;
  submitBtn.textContent = "تغیر تودو موزی";
};
