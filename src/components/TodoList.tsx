import { useEffect, useState } from "react";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import fetchTodoList from "../api/todo";

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getItems() {
      setIsFetching(true);

      const fetchedData = await fetchTodoList();
      setTodoItems(fetchedData.data);

      setIsFetching(false);
    }
    getItems();
  }, []);

  return (
    <ul className={classes.list}>
      {isFetching && <p>Fetching todo list...</p>}
      {todoItems.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}
