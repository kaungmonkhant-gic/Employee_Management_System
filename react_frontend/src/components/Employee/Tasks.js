import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete Project A Documentation", status: "Pending" },
    { id: 2, name: "Fix Issue #12345", status: "Completed" },
    { id: 3, name: "Prepare for Team Meeting", status: "In Progress" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null); // Tracks the task being edited

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), name: newTask, status: newStatus },
      ]);
      setNewTask("");
      setNewStatus("Pending");
    }
  };

  const updateTask = (id, updatedName, updatedStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, name: updatedName, status: updatedStatus }
          : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Assigned Tasks</h4>
        </div>
        <div className="card-body">
          {/* Add Task Form */}
          <div className="mb-4">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <select
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
              <button className="btn btn-success" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex justify-content-between mb-3">
            {["All", "Pending", "Completed", "In Progress"].map((status) => (
              <button
                key={status}
                className={`btn ${
                  filter === status
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Task List */}
          <ul className="list-group">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editingTask === task.id ? (
                    <div className="d-flex align-items-center w-100">
                      <input
                        type="text"
                        className="form-control me-2"
                        defaultValue={task.name}
                        onChange={(e) => (task.name = e.target.value)}
                      />
                      <select
                        className="form-select me-2"
                        defaultValue={task.status}
                        onChange={(e) => (task.status = e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          updateTask(task.id, task.name, task.status)
                        }
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingTask(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <strong>{task.name}</strong>
                      </div>
                      <div className="d-flex align-items-center">
                        <span
                          className={`badge me-3 ${
                            task.status === "Pending"
                              ? "bg-warning text-dark"
                              : task.status === "Completed"
                              ? "bg-success"
                              : "bg-primary"
                          }`}
                        >
                          {task.status}
                        </span>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => setEditingTask(task.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">
                No tasks available.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
