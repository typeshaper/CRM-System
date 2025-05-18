import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo, todoStatus } from "../types/types";

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
  const filteredTodoList = structuredClone(todoList).filter((item) => {
    switch (status) {
      case "all":
        return item;
      case "inWork":
        return !item.isDone;
      case "completed":
        return item.isDone;
    }
  });

  return (
    <ul className={classes.list}>
      {isFetching && (
        <p className={classes["fetching-message"]}>Fetching todo list...</p>
      )}
      {filteredTodoList.map((todo) => (
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
