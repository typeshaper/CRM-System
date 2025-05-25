import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import type { Todo, TodoStatus, TodoInfo } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";

const TodoListPage = () => {
  const [hasFetchingError, setHasFetchingError] = useState<boolean>(false);
  const [status, setStatus] = useState<TodoStatus>("all");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListInfo, setTodoListInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const updateTasks = async () => {
    try {
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
      if (fetchedData.info) {
        setTodoListInfo(fetchedData.info);
      }
    } catch (error) {
      setHasFetchingError(true);
    }
  };

  useEffect(() => {
    updateTasks();
  }, [status]);

  return (
    <>
      <AddTodo updateTasks={updateTasks} />
      <StatusNavigation
        setStatus={setStatus}
        todoListInfo={todoListInfo}
        status={status}
      />
      <TodoList
        todoList={todoList}
        updateTasks={updateTasks}
      />
      {hasFetchingError && <p>Failed to fetch to-do list...</p>}
    </>
  );
};

export default TodoListPage;
