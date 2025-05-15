import type { Todo } from "../types";
import classes from "./TodoItem.module.css";
import isDoneIcon from "../assets/checkbox-done.png";
import isNotDone from "../assets/checkbox-undone.png";
import deleteIcon from "../assets/delete.png";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { title, isDone, id } = todo;

  return (
    <li>
      <img
        className={classes["task-status-icon"]}
        src={isDone ? isDoneIcon : isNotDone}
      />
      <p className={isDone ? classes["text-done"] : ""}>{title}</p>
      <div className={classes["icons-wrapper"]}>
        <div className={classes["delete-icon-wrapper"]}>
          <img
            className={classes["deleteIcon"]}
            src={deleteIcon}
          />
        </div>
      </div>
    </li>
  );
}
