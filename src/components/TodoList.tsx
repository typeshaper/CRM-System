import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo, todoStatus } from "../types";

export default function TodoList({
  todoList,
  isFetching,
  setTodoList,
  status,
}: {
  todoList: Todo[];
  isFetching: boolean;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: todoStatus;
}) {
  return (
    <ul className={classes.list}>
      {isFetching && <p>Fetching todo list...</p>}
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setTodoList={setTodoList}
          status={status}
        />
      ))}
    </ul>
  );
}
