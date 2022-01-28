const MAIN_CONTAINER = document.getElementById("root");
const TODO_STATES = [
  {
    value: "todo",
    label: "To Do",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
];
const TODO_TYPES = [
  {
    value: "warning",
    label: "Warning",
  },
  {
    value: "error",
    label: "Error",
  },
  {
    value: "info",
    label: "Info",
  },
  {
    value: "success",
    label: "Success",
  },
];
let TODO_ITEMS = [];
let TODO_TEXT_EL, TODO_TYPE_EL, TODO_LIST_CONTAINER_EL;
init();

function init() {
  initNewTodoSection();
  initContent();
}

function deleteToDo(event) {
  event.stopPropagation();
  const parent = event.target.parentElement;
  const dataId = +parent.getAttribute("data-id");
  parent.remove();
  TODO_ITEMS = TODO_ITEMS.filter((e) => e.id !== dataId);
  setTodos();
}

/* Create the html */
function getToDoItem({ text, type, id, done }) {
  const Row = document.createElement("div");
  Row.className = `todo-item ${type}`;
  Row.setAttribute("data-id", id);
  const Text = document.createTextNode(text);
  const DeleteIcon = document.createElement("span");
  DeleteIcon.className = "icon-bin delete-btn";
  DeleteIcon.addEventListener("click", deleteToDo);
  Row.addEventListener("click", function (event) {
    // console.log(event);
    // if (event.target.className.includes("delete-btn")) {
    //   deleteToDo(event);
    //   return;
    // }
    event.target.style.textDecoration = !event.target.style.textDecoration
      ? "line-through"
      : "";
    const todoId = event.target.getAttribute("data-id");
    TODO_ITEMS = TODO_ITEMS.map((e) =>
      e.id === todoId ? e : { ...e, done: !e.done }
    );
    setTodos();
  });
  Row.style.textDecoration = done ? "line-through" : "";

  Row.append(Text);
  Row.append(DeleteIcon);

  return Row;
}
function initContent() {
  let TodoContainer = document.createElement("div");
  TodoContainer.id = "TodoContainer";
  TodoContainer.className = "todo-container";
  const Text = document.createTextNode("Todo List");
  let Heading = document.createElement("h1");
  Heading.className = "todo-list-heading";
  Heading.append(Text);
  TodoContainer.append(Heading);
  TODO_ITEMS = getTodos();
  TODO_ITEMS.forEach((todo) => {
    TodoContainer.append(getToDoItem(todo));
  });

  TODO_LIST_CONTAINER_EL = TodoContainer;
  MAIN_CONTAINER.append(TodoContainer);
}
function AddToDoItem() {
  if (TODO_TEXT_EL.value && TODO_TYPE_EL.value) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    let new_item = {
      id: timestamp,
      text: TODO_TEXT_EL.value,
      type: TODO_TYPE_EL.value,
      done: false,
    };
    TODO_ITEMS.push(new_item);
    setTodos();
    let new_el = getToDoItem(new_item);
    TODO_LIST_CONTAINER_EL.append(new_el);
    TODO_TEXT_EL.value = "";
    TODO_TYPE_EL.value = "";
  } else {
    alert("Insert some text");
  }
}

function initNewTodoSection() {
  const Container = document.createElement("div");
  Container.id = "actionConatiner";
  const InputBox = getInputBox();
  Container.append(InputBox);
  const SelectBox = getSelectBox();
  Container.append(SelectBox);
  const ActionBox = getActionBox();
  Container.append(ActionBox);
  MAIN_CONTAINER.append(Container);
}

function getActionBox() {
  const Wrapper = document.createElement("div");
  Wrapper.className = "action-box inlined-box";
  const Button = document.createElement("button");
  Button.type = "button";
  Button.id = "addTodo";
  const Text = document.createTextNode("Add Todo");
  Button.append(Text);
  Wrapper.append(Button);
  Button.addEventListener("click", AddToDoItem);
  return Wrapper;
}
function getInputBox() {
  const Wrapper = document.createElement("div");
  Wrapper.className = "input-box inlined-box";
  const Input = document.createElement("input");
  Input.type = "text";
  Input.id = "todoText";
  TODO_TEXT_EL = Input;
  Wrapper.append(Input);
  return Wrapper;
}
function getSelectBox() {
  const Wrapper = document.createElement("div");
  Wrapper.className = "select-box inlined-box";
  const Select = document.createElement("select");
  Select.id = "todoType";

  const Options = getTodoTypeOptions();
  const DefaultOption = createOption({
    label: " -- select an option -- ",
    value: "",
  });
  DefaultOption.disabled = true;
  DefaultOption.selected = true;
  DefaultOption.hidden = true;
  Select.append(DefaultOption);
  Options.forEach((e) => Select.append(e));
  TODO_TYPE_EL = Select;
  Wrapper.append(Select);
  return Wrapper;
}

function getTodoTypeOptions() {
  return TODO_TYPES.map(createOption);
}

function createOption(data) {
  const option = document.createElement("option");
  option.value = data.value;
  const text = document.createTextNode(data.label);
  option.append(text);
  return option;
}

/* set/get for the todo_items */

function setTodos() {
  localStorage.setItem("todos", JSON.stringify(TODO_ITEMS));
}
function getTodos() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}

// function initNewTodoSection() {
//   MAIN_CONTAINER.innerHTML = `
//         <div id="actionConatiner">
//             <div class="input-box inlined-box">
//                 <input type="text" id="todoText" />
//             </div>
//             <div class="select-box inlined-box">
//                 <select name="" id="todoType" value=''>
//                     <option disabled selected value hidden> -- select an option -- </option>
//                     ${getTodoTypeOptions()}
//                 </select>
//             </div>
//             <div class="action-box inlined-box">
//                 <button id="addTodo">Add Todo</button>
//             </div>
//         </div>
// `;
// }

// function getTodoTypeOptions() {
//   return TODO_TYPES.map(
//     (e) => `<option value="${e.value}">${e.label}</option>`
//   ).join("");
// }
