import React, { useState, useEffect } from "react";
import "./ManageTasks.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  const updateStatus = (idx, newStatus) => {
    const updated = tasks.map((t, i) =>
      i === idx ? { ...t, status: newStatus } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const deleteTask = (idx) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updated = tasks.filter((_, i) => i !== idx);
      setTasks(updated);
      localStorage.setItem("tasks", JSON.stringify(updated));
    }
  };

  const saveEditedTask = (idx, editedTask) => {
    const updated = tasks.map((t, i) =>
      i === idx ? { ...t, ...editedTask } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const todoTasks = tasks.filter(
    (task) => !task.status || task.status === "To Do"
  );
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className={`manage-task-wrapper ${darkMode ? "dark" : "light"}`}>
      <div className="back-button-wrapper">
        <Link to="/Dashboard" className="backtodb">
          ⬅ Back to Dashboard
        </Link>
      </div>

      <h1 className="heading"> Manage Tasks</h1>

      <div className="kanban-board">
        {todoTasks.length > 0 && (
          <KanbanColumn
            title="📝 To Do"
            tasks={todoTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            saveEditedTask={saveEditedTask}
          />
        )}

        {inProgressTasks.length > 0 && (
          <KanbanColumn
            title="🚧 In Progress"
            tasks={inProgressTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            saveEditedTask={saveEditedTask}
          />
        )}

        {completedTasks.length > 0 && (
          <KanbanColumn
            title="✅ Completed"
            tasks={completedTasks}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            saveEditedTask={saveEditedTask}
          />
        )}
      </div>
    </div>
  );
};

const KanbanColumn = ({
  title,
  tasks,
  updateStatus,
  deleteTask,
  saveEditedTask,
}) => (
  <div className="kanban-column">
    <h3>{title}</h3>
    {tasks.map((t, i) => (
      <TaskCard
        key={i}
        task={t}
        idx={i}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
        saveEditedTask={saveEditedTask}
      />
    ))}
  </div>
);

const TaskCard = ({ task, idx, updateStatus, deleteTask, saveEditedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    saveEditedTask(idx, {
      // Pass the task's index
      taskName: editedTaskName,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const statusClass =
    task.status === "Completed"
      ? "badge-completed"
      : task.status === "In Progress"
      ? "badge-inprogress"
      : "badge-todo";

  return (
    <div className="task-card">
      <div className="task-header">
        {isEditing ? (
          <input
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
        ) : (
          <h4>{task.taskName}</h4>
        )}
        <span className={`status-badge ${statusClass}`}>
          {task.status || "To Do"}
        </span>
      </div>

      <div className="task-info">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={3}
          />
        ) : (
          <p>{task.description}</p>
        )}
        <small>
          📂 {task.category} | ⚡ {task.priority} | 📅 {task.date}
        </small>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              💾 Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </>
        ) : (
          <>
            {(!task.status || task.status === "To Do") && (
              <button
                className="inprogress-btn"
                onClick={() => updateStatus(idx, "In Progress")}
              >
                🚧 Start Progress
              </button>
            )}
            {task.status !== "Completed" && (
              <button
                className="complete-btn"
                onClick={() => updateStatus(idx, "Completed")}
              >
                ✅ Mark Complete
              </button>
            )}
            {(task.status === "To Do" || task.status === "In Progress") && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ✏️ Edit
              </button>
            )}
            <button className="delete-btn" onClick={() => deleteTask(idx)}>
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageTasks;
