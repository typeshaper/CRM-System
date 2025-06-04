import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import StatusNavigation from "../components/StatusNavigation";
import { fetchTodoList } from "../api/todo";
import { useEffect, useState, useCallback } from "react";
import type { Todo, TodoStatus, TodoInfo } from "../types/types";
import useErrorMessage from "../hooks/useErrorMessage";
import { AxiosError } from "axios";

const TodoListPage = () => {
  const showError = useErrorMessage();
  const [status, setStatus] = useState<TodoStatus>("all");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListInfo, setTodoListInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const updateTasks = useCallback(async () => {
    try {
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
      if (fetchedData.info) {
        setTodoListInfo(fetchedData.info);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error.response?.data);
      }
    }
  }, [status, showError]);

  useEffect(() => {
    const timerId = setInterval(() => {
      updateTasks();
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  });

  useEffect(() => {
    updateTasks();
  }, [status]);

  return (
    <>
      <AddTodo updateTasks={updateTasks} />
      <StatusNavigation
        setStatus={setStatus}
        todoListInfo={todoListInfo}
      />
      <TodoList
        todoList={todoList}
        updateTasks={updateTasks}
      />
    </>
  );
};

export default TodoListPage;
