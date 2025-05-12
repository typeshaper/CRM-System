import type { MetaResponse, Todo, TodoInfo } from "../types";
import TodoItem from "./TodoItem";
import { useRouteLoaderData } from "react-router";
import classes from "./TodoList.module.css";

export default function TodoList() {
  const data: MetaResponse<Todo, TodoInfo> = useRouteLoaderData("todo-page")!;
  const todoItems: Todo[] = data.data;

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

export async function loader() {
  const response: Response = await fetch("https://easydev.club/api/v1/todos", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not load to do list" }),
      {
        status: 500,
      }
    );
  }
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();
  return resData;
}
