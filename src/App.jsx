import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    <div className="container my-5 px-5">
      <div className="row justify-content-center">
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-6 todo-wrapper p-4 rounded shadow"
          style={{ backgroundColor: "#F2EDD1", marginTop: "110px" }}
        >
          <h3 className="mb-4 text-center">
            TODO REACT APP{" "}
            <img
              src={img}
              className="img-fluid"
              alt="Todo Icon"
              style={{ height: "40px", width: "55px" }}
            />
          </h3>

          {/* Summary Stats */}
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-4">
            <div className="px-2 py-1 bg-warning rounded text-dark flex-grow-1 text-center">
              <strong>Total:</strong> {todos.length}
            </div>
            <div className="px-2 py-1 bg-success rounded text-dark flex-grow-1 text-center">
              <strong>Done:</strong> {todos.filter((t) => t.checked).length}
            </div>
            <div className="px-2 py-1 bg-danger rounded text-white flex-grow-1 text-center">
              <strong>Remaining:</strong>{" "}
              {todos.filter((t) => !t.checked).length}
            </div>
          </div>

          {/* Add Task */}
          <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
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
                className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3"
                style={{ fontSize: "18px" }}
              >
                {/* Left: Checkbox + Text or Input */}
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleToggle(index)}
                    style={{
                      transform: todo.checked ? "scale(1.3)" : "scale(1)",
                      cursor: "pointer",
                    }}
                  />
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: todo.checked ? "line-through" : "none",
                        wordBreak: "break-word",
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
                    Delete <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
