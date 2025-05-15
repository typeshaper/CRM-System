import type { Todo } from "../types";
import classes from "./TodoItem.module.css";
import isDoneIcon from "../assets/checkbox-done.png";
import isNotDone from "../assets/checkbox-undone.png";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import { deleteTodoItem, editTodo, fetchTodoList } from "../api/todo";

export default function TodoItem({
  todo,
  setTodoList,
}: {
  todo: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
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

  return (
    <li>
      <img
        onClick={handleStatusButton}
        className={classes["task-status-icon"]}
        src={isDone ? isDoneIcon : isNotDone}
      />

      <p className={isDone ? classes["text-done"] : ""}>{title}</p>

      <div className={classes["icons-wrapper"]}>
        <div className={classes["edit-icon-wrapper"]}>
          <img
            onClick={handleDeleteButton}
            className={classes["deleteIcon"]}
            src={editIcon}
          />
        </div>

        <div className={classes["delete-icon-wrapper"]}>
          <img
            onClick={handleDeleteButton}
            className={classes["delete-icon"]}
            src={deleteIcon}
          />
        </div>
      </div>
    </li>
  );
}
