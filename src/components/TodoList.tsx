import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo, todoStatus } from "../types/types";

export default function TodoList({
  status,
  updateTasks,
  todoList,
  fetchingError,
}: {
  status: todoStatus;
  updateTasks: (status: todoStatus) => void;
  todoList: Todo[];
  fetchingError: string;
}) {
  return (
    <ul className={classes.list}>
      {!fetchingError &&
        todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTasks={updateTasks}
            status={status}
          />
        ))}
      {fetchingError && <p>{fetchingError}</p>}
    </ul>
  );
}
