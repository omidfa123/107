// const submitBtn = document.getElementById("submit-btn");
// const title = document.getElementById("title");
// const description = document.getElementById("description");
const form = document.getElementById("moz-form");
const todoContainer = document.getElementById("todo-container");

// toto {title : "mamad"  , description : "mmassd"  , id: "" , isDone : true}

let todoList = [];
let id = 1;

// submitBtn.addEventListener("click", function () {
//   const titleValue = title.value;
//   const descriptionValue = description.value;
//   window.moz = "moz";
// });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target["title"].value;
  const descriptionValue = event.target["description"].value;
  if (!titleValue || !descriptionValue) return;
  todoList.push({
    title: titleValue,
    description: descriptionValue,
    id: id,
    isDone: false,
  });
  id++;
  form.reset();
  console.log(todoList);
  renderTodo(todoList);
});

function renderTodo(todoList) {
  todoContainer.innerHTML = "";
  todoList.forEach((todo) => {
    const todoCard = `<figure
              class="shadow-sm rounded-2xl bg-white text-black px-4 py-5 border-2 border-dashed border-amber-500"
            >
              <ul class="space-y-4">
                <li>
                  <span class="text-lg font-bold">عنوان :</span>
                  <span>${todo.title}</span>
                </li>
                <li>
                  <span class="text-lg font-bold">توضیحات :</span>
                  <span>${todo.description}</span
                  >
                </li>
                <li class="flex justify-between px-4 pt-4">
                  <button>delete</button>
                  <button>edit</button>
                  <button>done</button>
                </li>
              </ul>
            </figure>
  `;
    todoContainer.innerHTML += todoCard;
  });
}
