import type { Todo } from "../types";
import classes from "./TodoItem.module.css";
import isDoneIcon from "../assets/checkbox-done.svg";
import isNotDone from "../assets/checkbox-undone.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { deleteTodoItem, editTodo, fetchTodoList } from "../api/todo";
import EditTodo from "./EditTodo";
import { useState } from "react";

export default function TodoItem({
  todo,
  setTodoList,
}: {
  todo: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { title, isDone, id } = todo;

  function handleDeleteButton() {
    (async () => {
      await deleteTodoItem(id);
      const fetchedData = await fetchTodoList();
      setTodoList(fetchedData.data);
    })();
  }

  function handleStatusButton() {
    (async () => {
      await editTodo(id, { isDone: !isDone });
      const fetchedData = await fetchTodoList();
      setTodoList(fetchedData.data);
    })();
  }
  function handleEditButton() {
    setIsEditing((isEditing) => !isEditing);
  }

  return (
    <li>
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
          title={title}
          id={id}
          setTodoList={setTodoList}
          setIsEditing={setIsEditing}
          handleDeleteButton={handleDeleteButton}
        />
      )}

      {!isEditing && (
        <div className={classes["icons-wrapper"]}>
          <div className={classes["edit-icon-wrapper"]}>
            <img
              onClick={handleEditButton}
              src={editIcon}
            />
          </div>

          <div className={classes["delete-icon-wrapper"]}>
            <img
              onClick={handleDeleteButton}
              src={deleteIcon}
            />
          </div>
        </div>
      )}
    </li>
  );
}
