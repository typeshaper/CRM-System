import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo, todoStatus } from "../types/types";

export default function TodoList({
  status,
  updateTasks,
  todoList,
}: {
  status: todoStatus;
  updateTasks: (status: todoStatus) => void;
  todoList: Todo[];
}) {
  return (
    <ul className={classes.list}>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTasks={updateTasks}
          status={status}
        />
      ))}
    </ul>
  );
}
