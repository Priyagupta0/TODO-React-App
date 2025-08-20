import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import img from "./img.png";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].checked = !updated[index].checked;
    setTodos(updated);
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") return;
    const updated = [...todos];
    updated[editIndex].text = editText;
    setTodos(updated);
    setEditIndex(null);
    setEditText("");
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTodos([...todos, { text: newTask, checked: false }]);
    setNewTask("");
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "150px",
        backgroundColor: "white",
        borderRadius: "20px",
        width: "600px",
        minHeight: "200px",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className="mb-3 p-2 text-center">
        TODO REACT APP{" "}
        <img
          src={img}
          style={{
            height: "40px",
            width: "55px",
          }}
        />
      </h3>
      <div className="d-flex justify-content-between mb-3 px-2">
        <div
          style={{
            backgroundColor: "Yellow",
            width: "70px",
            height: "35px",
            borderRadius: "5px",
            opacity: "0.8",
            padding: "6px",
            color: "black",
          }}
        >
          <strong>Total:</strong> {todos.length}
        </div>
        <div
          style={{
            backgroundColor: "lightgreen",
            width: "70px",
            height: "35px",
            borderRadius: "5px",
            opacity: "0.8",
            padding: "6px",
            color: "black",
          }}
        >
          <strong>Done:</strong> {todos.filter((t) => t.checked).length}
        </div>
        <div
          style={{
            backgroundColor: "red",
            width: "120px",
            height: "35px",
            borderRadius: "5px",
            opacity: "0.5",
            padding: "5px",
            color: "white",
          }}
        >
          <strong>Remaining:</strong> {todos.filter((t) => !t.checked).length}
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask} className="btn btn-primary">
          Add
        </button>
      </div>

      {/* No Task Message */}
      {todos.length === 0 && (
        <p className="text-muted text-center">
          No tasks yet. Start by adding one!
        </p>
      )}

      {/* Task List */}
      <ul className="list-unstyled">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="d-flex align-items-center justify-content-between mb-3"
            style={{ fontSize: "20px" }}
          >
            {/* Left: Checkbox + Text or Input */}
            <div className="d-flex align-items-center gap-3">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleToggle(index)}
                style={{
                  transform: todo.checked ? "scale(1.3)" : "scale(1)",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="form-control"
                  style={{ width: "250px" }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.checked ? "line-through" : "none",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  {todo.text}
                </span>
              )}
            </div>

            {/* Right: Buttons */}
            <div className="d-flex gap-2">
              {editIndex === index ? (
                <button
                  onClick={handleSaveEdit}
                  className="btn btn-success btn-sm"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-warning btn-sm"
                >
                  Edit <FontAwesomeIcon icon={faPencil} />
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
