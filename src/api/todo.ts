import type { MetaResponse, Todo, TodoInfo, TodoRequest } from "../types";

export async function fetchTodoList() {
  const response: Response = await fetch("https://easydev.club/api/v1/todos");
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();
  return resData;
}

export async function createTodoItem(title: string) {
  const todo: TodoRequest = {
    title,
    isDone: false,
  };

  const response: Response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData: Todo = await response.json();
  return resData;
}

// Method: POST
// URL: /todos
// Request: TodoRequest
// Response: Todo
