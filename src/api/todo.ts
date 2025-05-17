import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  todoStatus,
} from "../types";
const BASE_URL = "https://easydev.club/api/v1/";

export async function fetchTodoList(status: todoStatus) {
  const response: Response = await fetch(BASE_URL + "todos?filter=" + status, {
    method: "GET",
  });
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();
  return resData;
}

export async function createTodoItem(title: string) {
  const todo: TodoRequest = {
    title,
    isDone: false,
  };

  const response: Response = await fetch(BASE_URL + "todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData: Todo = await response.json();
  return resData;
}

export async function deleteTodoItem(id: number) {
  const response: Response = await fetch(BASE_URL + "todos/" + id, {
    method: "DELETE",
  });
}

export async function editTodo(id: number, taskData: TodoRequest) {
  const response: Response = await fetch(BASE_URL + "todos/" + id, {
    method: "PUT",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData: Todo = await response.json();
  return resData;
}
