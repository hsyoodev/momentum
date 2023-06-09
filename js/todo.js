const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEYS = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEYS, JSON.stringify(toDos));
}
function deleteToDo(event) {
  const toDoListToArray = Array.from(toDoList.childNodes);
  const toDo = event.target.parentElement;
  const toDoIndex = toDoListToArray.indexOf(toDo);
  toDo.remove();
  toDos = toDos.filter((toDo, index) => index !== toDoIndex);
  saveToDos();
}
function paintToDo(newToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = newToDo;
  const button = document.createElement("button");
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  button.addEventListener("click", deleteToDo);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  toDos.push(newToDo);
  paintToDo(newToDo);
  saveToDos(toDos);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEYS);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
