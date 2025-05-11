import type { Todo } from "../types";
import classes from "./TodoItem.module.css";
import isDoneIcon from "../assets/checkbox-done.png";
import isNotDone from "../assets/checkbox-undone.png";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { title, isDone } = todo;

  return (
    <li>
      <img src={isDone ? isDoneIcon : isNotDone} />
      <p className={isDone ? classes["text-done"] : ""}>{title}</p>
    </li>
  );
}
