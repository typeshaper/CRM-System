import { AxiosError, type AxiosResponse } from "axios";
import { api } from "./index";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  TodoStatus,
} from "../types/todo";

export async function fetchTodoList(
  status: TodoStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: `/todos`,
      params: { filter: status },
    });

    const resData: MetaResponse<Todo, TodoInfo> = response.data;

    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function createTodoItem(title: string) {
  const todo: TodoRequest = {
    title,
    isDone: false,
  };

  try {
    const response: AxiosResponse = await api({
      method: "post",
      url: "/todos",
      data: todo,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: Todo = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function deleteTodoItem(id: number) {
  try {
    const response: AxiosResponse = await api({
      method: "delete",
      url: `/todos/${id}`,
    });

    return response;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function editTodo(id: number, taskData: TodoRequest) {
  try {
    const response: AxiosResponse = await api({
      method: "put",
      url: `/todos/${id}`,
      data: taskData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: Todo = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
