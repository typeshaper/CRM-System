import type { Todo } from "../types/types";
import { deleteTodoItem, editTodo } from "../api/todo";
import { hasValidTodoTitle } from "../utility/validation";
import { useState } from "react";
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
    <li>
      <button>
        <img
          onClick={handleStatusButton}
          src={isDone ? isDoneIcon : isNotDone}
        />
      </button>

      {editingError && <p>{editingError.message}</p>}
      {!isEditing && <p>{title}</p>}

      {isEditing && (
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            value={newTitleValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div>
            <div>
              <button type="submit">
                <img src={saveIcon} />
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={handleUndoButton}
              >
                <img src={undoIcon} />
              </button>
            </div>
          </div>
          {!isValidTitle && didEdit && (
            <p>Title must be between 2 and 64 characters long!</p>
          )}
        </form>
      )}

      {!isEditing && (
        <div>
          <div>
            <button
              type="button"
              onClick={handleEditButton}
            >
              <img src={editIcon} />
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleDeleteButton}
            >
              <img src={deleteIcon} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
