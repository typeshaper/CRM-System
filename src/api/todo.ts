import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  TodoStatus,
} from "../types/types";

const BASE_URL = "https://easydev.club/api/v1/";

export async function fetchTodoList(
  status: TodoStatus
): Promise<MetaResponse<Todo, TodoInfo> | Error> {
  try {
    const response: Response = await fetch(
      `${BASE_URL}todos?filter=${status}`,
      {
        method: "GET",
      }
    );
    const resData: MetaResponse<Todo, TodoInfo> = await response.json();

    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}

export async function createTodoItem(title: string) {
  const todo: TodoRequest = {
    title,
    isDone: false,
  };

  try {
    const response: Response = await fetch(`${BASE_URL}todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: Todo = await response.json();
    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}

export async function deleteTodoItem(id: number) {
  try {
    const response: Response = await fetch(`${BASE_URL}todos/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error: unknown) {
    throw error as Error;
  }
}

export async function editTodo(id: number, taskData: TodoRequest) {
  try {
    const response: Response = await fetch(`${BASE_URL}todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData: Todo = await response.json();

    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}
