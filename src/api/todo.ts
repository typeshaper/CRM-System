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
): Promise<MetaResponse<Todo, TodoInfo>> {
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

    if (response.status === 400) {
      throw new Error("Invalid request body or missing/incorrect fields.");
    }

    if (response.status === 500) {
      throw new Error("Internal server error.");
    }

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
    if (response.status === 404) {
      throw new Error("Could not find task");
    }

    if (response.status === 400) {
      throw new Error("Invalid or missing task id");
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

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

    if (response.status === 400) {
      throw new Error(
        "Invalid request body, missing/incorrect fields, or invalid ID."
      );
    }

    if (response.status === 404) {
      throw new Error("Task not found.");
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    const resData: Todo = await response.json();
    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}
