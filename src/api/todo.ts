import type { MetaResponse, Todo, TodoInfo } from "../types";

export default async function fetchTodoList() {
  const response: Response = await fetch("https://easydev.club/api/v1/todos");
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();
  return resData;
}
