import type { Todo, TodoStatus } from "../types/types";
import classes from "./TodoItem.module.css";
import isDoneIcon from "../assets/checkbox-done.svg";
import isNotDone from "../assets/checkbox-undone.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { deleteTodoItem, editTodo } from "../api/todo";
import EditTodo from "./EditTodo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  status: TodoStatus;
  updateTasks: (status: TodoStatus) => void;
}

const TodoItem = ({ todo, status, updateTasks }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { title, isDone, id } = todo;

  const handleDeleteButton = async () => {
    await deleteTodoItem(id);
    updateTasks(status);
  };

  const handleStatusButton = async () => {
    await editTodo(id, { isDone: !isDone });
    setIsEditing(false);
    updateTasks(status);
  };

  const handleEditButton = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <li className={classes["todo-item"]}>
      <img
        onClick={handleStatusButton}
        className={classes["task-status-icon"]}
        src={isDone ? isDoneIcon : isNotDone}
      />

      {!isEditing && (
        <p className={isDone ? classes["text-done"] : ""}>{title}</p>
      )}

      {isEditing && (
        <EditTodo
          status={status}
          title={title}
          id={id}
          setIsEditing={setIsEditing}
          updateTasks={updateTasks}
        />
      )}

      {!isEditing && (
        <div className={classes["icons-wrapper"]}>
          <div className={classes["edit-icon-wrapper"]}>
            <button
              type="button"
              onClick={handleEditButton}
              className={classes["edit-button"]}
            >
              <img
                src={editIcon}
                className={classes["edit-icon"]}
              />
            </button>
          </div>

          <div className={classes["delete-icon-wrapper"]}>
            <button
              type="button"
              onClick={handleDeleteButton}
              className={classes["delete-button"]}
            >
              <img
                className={classes["delete-icon"]}
                src={deleteIcon}
              />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
