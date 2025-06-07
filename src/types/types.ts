export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export type TodoStatus = "all" | "completed" | "inWork";

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export interface TodoFormData {
  title: string;
}
