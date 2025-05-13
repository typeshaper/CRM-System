import { useEffect, useState } from "react";
import type { MetaResponse, Todo, TodoInfo } from "../types";
import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTodoList() {
      try {
        const response: Response = await fetch(
          "https://easydev.club/api/v1/todos"
        );
        const resData: MetaResponse<Todo, TodoInfo> = await response.json();
        const todoList = resData.data;
        if (!response.ok) {
          throw new Error("Could not load to do list");
        }
        setTodoItems(todoList);
      } catch (error) {
        setError("Could not load to do list!");
      }
    }
    loadTodoList();
  }, []);

  return (
    <ul className={classes.list}>
      {error && <p>{error}</p>}
      {todoItems.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}
