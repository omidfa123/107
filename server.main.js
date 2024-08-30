const submitBtn = document.getElementById("submit-btn");
const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.getElementById("moz-form");
const todoContainer = document.getElementById("todo-container");

const BASE_URL = "https://www.omidfaryabi.ir/api/todo";

let editID = 0;

async function postTodo(todoTitle, todoDescription) {
  const TodoData = {
    title: todoTitle,
    description: todoDescription,
  };
  const userID = localStorage.getItem("user_id");

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(TodoData),
      headers: userID
        ? { "Content-Type": "application / json", "x-user-id": userID }
        : { "Content-Type": "application / json" },
    });

    const data = await res.json();

    if (!userID) {
      localStorage.setItem("user_id", data.userId);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function getTodos(id) {
  const userID = localStorage.getItem("user_id");
  if (!userID) return;

  const url = id ? BASE_URL + `?id=${id}` : BASE_URL;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "x-user-id": userID },
    });
    const data = await res.json();
    id || renderTodo(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
getTodos();

async function deleteTodo(todoID) {
  if (!todoID) return;

  try {
    const deleteData = JSON.stringify({ id: todoID });
    const userID = localStorage.getItem("user_id");

    const res = await fetch(BASE_URL, {
      method: "DELETE",
      body: deleteData,
      headers: { "x-user-id": userID },
    });
    if (res.ok) {
      await getTodos();
    }
  } catch (error) {
    console.error(error);
  }
}

async function putTodo(todo) {
  if (!todo) return;

  try {
    const putData = JSON.stringify(todo);
    const userID = localStorage.getItem("user_id");

    const res = await fetch(BASE_URL, {
      method: "PUT",
      body: putData,
      headers: { "x-user-id": userID },
    });
    if (res.ok) {
      await getTodos();
    }
  } catch (error) {
    console.error(error);
  }
}
async function patchTodo(todo) {
  if (!todo) return;

  try {
    const patchData = JSON.stringify(todo);
    const userID = localStorage.getItem("user_id");

    const res = await fetch(BASE_URL, {
      method: "PATCH",
      body: patchData,
      headers: { "x-user-id": userID },
    });
    if (res.ok) {
      await getTodos();
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titleValue = event.target["title"].value;
  const descriptionValue = event.target["description"].value;

  if (!titleValue || !descriptionValue) return;

  if (editID) {
    const res = await putTodo({
      id: editID,
      title: titleValue,
      description: descriptionValue,
      isDone: false,
    });
    submitBtn.textContent = "تودو موز +";
    form.reset();

    if (res.ok) {
      await getTodos();
    }
  } else {
    const res = await postTodo(titleValue, descriptionValue);

    if (res.ok) {
      await getTodos();
    }
  }

  form.reset();
});

function renderTodo(todoList) {
  todoContainer.innerHTML = "";
  todoList.forEach((todo) => {
    const isTodoDone = todo.is_done;
    const doneBtnClassNames = isTodoDone
      ? "text-[34px] text-green-500"
      : "text-[34px] text-gray-200";
    const todoCard = `<figure
              class="shadow-sm rounded-2xl bg-white text-black px-4 py-5 border-2 border-dashed border-amber-500 max-w-[320px] z-10 relative"
            >
              <ul class="space-y-4 flex flex-col h-full">
                <li class=${isTodoDone ? "line-through" : ""}>
                  <span class="text-lg font-bold">عنوان :</span>
                  <span>${todo.title}</span>
                </li>
                <li  class=${isTodoDone ? "line-through flex-1" : "flex-1"}>
                  <span class="text-lg font-bold">توضیحات :</span>
                  <span class="line-clamp-2" title=${todo.description}>${
      todo.description
    }</span>
                </li>
                <li class="flex justify-between px-4 pt-4">
                  <button onClick={handleDelete(${
                    todo.id
                  })} class="text-[34px] text-red-500"><ion-icon name="trash-outline"></ion-icon></button>
                  <button onClick={handleEdit(${
                    todo.id
                  })} class="text-[34px] text-amber-500 "><ion-icon name="create-outline"></ion-icon></button>
                  <button onClick={handleDone(${
                    todo.id
                  })} class="${doneBtnClassNames}" >
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                  </button>
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

const handleDelete = async function (id) {
  await deleteTodo(id);
};

const handleEdit = async (id) => {
  const [editTodo] = await getTodos(id);
  editID = editTodo.id;
  title.value = editTodo.title;
  description.value = editTodo.description;
  submitBtn.textContent = "تغیر تودو موزی";
};

const handleDone = async (id) => {
  const [editTodo] = await getTodos(id);

  await patchTodo({ is_done: !editTodo.is_done, id });
};
