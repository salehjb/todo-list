import { useState, useRef } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const todoListRef = useRef(null);

  function changeHandler(e) {
    setTodo(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { text: todo, id: todos.length + 1 }]);
      setTodo("");
    } else {
      console.log("Please enter a todo");
    }
  }

  function filterTodo(e) {
    const todoList = todoListRef.current.children;
    for (let item = 0; item < todoList.length; item++) {
      const element = todoList[item];
      switch (e.target.value) {
        case "all":
          element.style.display = "flex";
          break;
        case "completed":
          if (element.classList.contains("completed")) {
            element.style.display = "flex";
          } else {
            element.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!element.classList.contains("completed")) {
            element.style.display = "flex";
          } else {
            element.style.display = "none";
          }
      }
    }
  }

  function completedTodo(e) {
    e.target.parentElement.classList.toggle("completed");
  }

  function deleteTodo(e) {
    e.target.parentElement.remove();
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEdit(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEdit(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-section-container">
        <form className="form-container" onSubmit={submitHandler}>
          <input
            name="todo"
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={changeHandler}
          />
          <button className="add-todo-button">+</button>
        </form>
        <select className="select-container" onChange={filterTodo}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <ul className="todo-list" ref={todoListRef}>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-container">
            <li className="todo-text">{todo.text}</li>
            <button className="edit-todo" onClick={() => handleEditClick(todo)}>
              Edit
            </button>
            <button onClick={deleteTodo} className="delete-todo">
              Del
            </button>
            <button onClick={completedTodo} className="complete-todo">
              Com
            </button>
          </div>
        ))}
      </ul>
      {isEdit ? (
        <form onSubmit={handleEditFormSubmit} className="edit-form-container">
          <input
            name="editTodo"
            type="text"
            placeholder={`Change ${currentTodo.text} to...`} 
            onChange={handleEditInputChange}
            className="edit-todo-input"
          />
          <button type="submit" className="update-todo-button">
            Update
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="close-todo-button"
          >
            Cancel
          </button>
        </form>
      ) : null}
    </div>
  );
}
