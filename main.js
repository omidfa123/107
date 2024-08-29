const submitBtn = document.getElementById("submit-btn");
const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.getElementById("moz-form");
const todoContainer = document.getElementById("todo-container");

// toto {title : "mamad"  , description : "mmassd"  , id: "" , isDone : true}

const BASE_URL = "https://www.omidfaryabi.ir/api/todo";

// let todoList = [];
// let id = 1;
let isEdit = 0;

// submitBtn.addEventListener("click", function () {
//   const titleValue = title.value;
//   const descriptionValue = description.value;
//   window.moz = "moz";
// });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titleValue = event.target["title"].value;
  const descriptionValue = event.target["description"].value;

  if (!titleValue || !descriptionValue) return;

  // CLIENT SIDE
  // if (isEdit) {
  //   todoList.forEach((todo) => {
  //     if (todo.id === isEdit) {
  //       todo.title = titleValue;
  //       todo.description = descriptionValue;
  //       submitBtn.textContent = "تودو موز +";
  //     }
  //   });
  // } else {
  //   todoList.push({
  //     title: titleValue,
  //     description: descriptionValue,
  //     id: id,
  //     isDone: false,
  //   });
  //   id++;
  // }

  //  USING AIP END POINT
  const TodoData = {
    title: titleValue,
    description: descriptionValue,
  };

  const userID = localStorage.getItem("user_id");
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(TodoData),
    headers: userID
      ? { "Content-Type": "application / json", "x-user-id": userID }
      : { "Content-Type": "application / json" },
  });

  const data = await res.json();
  console.log(data);

  if (!userID) {
    localStorage.setItem("user_id", data.userId);
  }

  if (res.ok) {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: { "x-user-id": localStorage.getItem("user_id") },
    });
    const data = await res.json();
    console.log(data);
    renderTodo(data);
  }

  form.reset();
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
    // const figure = document.createElement("figure");
    // figure.className =
    //   "shadow-sm rounded-2xl bg-white text-black px-4 py-5 border-2 border-dashed border-amber-500 max-w-[320px]";

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
