import type { Todo, todoStatus } from "../types";
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
  status,
}: {
  todo: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: todoStatus;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { title, isDone, id } = todo;

  function handleDeleteButton() {
    setTodoList((prevTodoList) => {
      const newTodoList = structuredClone(prevTodoList);
      return newTodoList.filter((item) => item.id !== id);
    });

    (async () => {
      await deleteTodoItem(id);
      const fetchedData = await fetchTodoList("all");
      setTodoList(fetchedData.data);
    })();
  }

  function handleStatusButton() {
    setTodoList((prevTodoList) => {
      const newTodoList = structuredClone(prevTodoList);
      const index = newTodoList.findIndex((item) => item.id === id);
      newTodoList[index].isDone = !isDone;
      return newTodoList;
    });

    (async () => {
      await editTodo(id, { isDone: !isDone });
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
    })();
  }
  function handleEditButton() {
    setIsEditing((isEditing) => !isEditing);
  }

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
          setTodoList={setTodoList}
          setIsEditing={setIsEditing}
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
}
