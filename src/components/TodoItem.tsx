import type { Todo } from "../types/types";
import { deleteTodoItem, editTodo } from "../api/todo";
import { hasValidTodoTitle } from "../utility/validation";
import { useState } from "react";
import classes from "./TodoItem.module.css";
import saveIcon from "../assets/save.svg";
import undoIcon from "../assets/undo.svg";
import isDoneIcon from "../assets/checkbox-done.svg";
import isNotDone from "../assets/checkbox-undone.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

interface TodoItemProps {
  todo: Todo;
  updateTasks: () => void;
}

const TodoItem = ({ todo, updateTasks }: TodoItemProps) => {
  const { title, isDone, id } = todo;
  const [editingError, setEditingError] = useState<Error>();
  const [isEditing, setIsEditing] = useState(false);
  const [didEdit, setDidEdit] = useState<boolean>(false);
  const [newTitleValue, setNewTitleValue] = useState<string>(title);
  const isValidTitle = hasValidTodoTitle(newTitleValue);

  const handleDeleteButton = async () => {
    try {
      await deleteTodoItem(id);
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      updateTasks();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitleValue(event.target.value);
    setDidEdit(false);
  };

  const handleBlur = () => {
    setDidEdit(true);
  };

  const handleStatusButton = async () => {
    try {
      await editTodo(id, { isDone: !isDone });
      setIsEditing(false);
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSave = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidTitle) return;
    try {
      await editTodo(id, { title: newTitleValue });
      updateTasks();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setEditingError(error);
      }
    }
  };

  const handleUndoButton = () => {
    setNewTitleValue(title);
    setIsEditing(false);
  };

  return (
    <li className={classes["todo-item"]}>
      <button className={classes["task-status-button"]}>
        <img
          onClick={handleStatusButton}
          className={classes["task-status-icon"]}
          src={isDone ? isDoneIcon : isNotDone}
        />
      </button>

      {editingError && <p>{editingError.message}</p>}
      {!isEditing && (
        <p className={isDone ? classes["text-done"] : ""}>{title}</p>
      )}

      {isEditing && (
        <form
          onSubmit={handleSave}
          className={classes["edit-form"]}
        >
          <input
            className={classes["edit-input"]}
            type="text"
            name="title"
            value={newTitleValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className={classes["icons-wrapper"]}>
            <div className={classes["save-icon-wrapper"]}>
              <button
                type="submit"
                className={classes["save-button"]}
              >
                <img
                  src={saveIcon}
                  className={classes["save-icon"]}
                />
              </button>
            </div>

            <div className={classes["undo-icon-wrapper"]}>
              <button
                type="button"
                onClick={handleUndoButton}
                className={classes["undo-button"]}
              >
                <img
                  className={classes["undo-icon"]}
                  src={undoIcon}
                />
              </button>
            </div>
          </div>
          {!isValidTitle && didEdit && (
            <p className={classes["validation-error"]}>
              Title must be between 2 and 64 characters long!
            </p>
          )}
        </form>
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
