import axios, { type AxiosResponse } from "axios";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  TodoStatus,
} from "../types/types";

const BASE_URL = "https://easydev.club/api/v1";
const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchTodoList(
  status: TodoStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response: AxiosResponse = await api.get(`/todos?filter=${status}`);

    const resData: MetaResponse<Todo, TodoInfo> = response.data;
    console.log(resData);

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
    const response: AxiosResponse = await api.post(`/todos`, {
      ...todo,
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
    const response: AxiosResponse = await api.delete(`/todos/${id}`);

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
    const response: AxiosResponse = await api.put(`/todos/${id}`, {
      ...taskData,
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
