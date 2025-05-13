import { useEffect, useState } from "react";
import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import fetchTodoList from "../api/todo";

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  useEffect(() => {
    async function getItems() {
      const fetchedData = await fetchTodoList();
      setTodoItems(fetchedData.data);
    }
    getItems();
  }, []);

  return (
    <ul className={classes.list}>
      {todoItems.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}
