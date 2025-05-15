import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo } from "../types";

export default function TodoList({
  todoList,
  isFetching,
}: {
  todoList: Todo[];
  isFetching: boolean;
}) {
  return (
    <ul className={classes.list}>
      {isFetching && <p>Fetching todo list...</p>}
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}
