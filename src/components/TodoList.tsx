import { useEffect, useState } from "react";
import type { MetaResponse, Todo, TodoInfo } from "../types";
import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  useEffect(() => {
    async function loadTodoList() {
      const response: Response = await fetch(
        "https://easydev.club/api/v1/todos",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not load to do list" }),
          {
            status: 500,
          }
        );
      }
      const resData: MetaResponse<Todo, TodoInfo> = await response.json();
      setTodoItems(resData.data);
    }
    loadTodoList();
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
