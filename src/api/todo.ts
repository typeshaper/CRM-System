import axios, { type AxiosResponse } from "axios";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  TodoStatus,
} from "../types/types";

const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

export async function fetchTodoList(
  status: TodoStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: `/todos`,
      params: { statusFilter: status },
      paramsSerializer: (params) => `filter=${params.statusFilter}`,
    });

    const resData: MetaResponse<Todo, TodoInfo> = response.data;

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
    const response: AxiosResponse = await api(`/todos`, {
      method: "post",
      url: "/todos",
      data: { ...todo },
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

    const resData: Todo = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}

export async function deleteTodoItem(id: number) {
  try {
    const response: AxiosResponse = await api({
      method: "delete",
      url: `/todos/${id}`,
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
    const response: AxiosResponse = await api(`/todos/${id}`, {
      method: "put",
      url: `/todos/${id}`,
      data: { ...taskData },
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

    const resData: Todo = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as Error;
  }
}
