import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { fetchTodoList } from "../../api/todo";
import AddTodo from "../../components/app/AddTodo";
import StatusNavigation from "../../components/app/StatusNavigation";
import TodoList from "../../components/app/TodoList";
import useErrorMessage from "../../hooks/useErrorMessage";
import type { Todo, TodoInfo, TodoStatus } from "../../types/todo";

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
        showError(error);
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
