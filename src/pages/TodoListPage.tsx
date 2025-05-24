import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import type { Todo, TodoStatus, TodoInfo } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";

const TodoListPage = () => {
  const [status, setStatus] = useState<TodoStatus>("all");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListInfo, setTodoListInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const updateTasks = async (status: TodoStatus) => {
    try {
      const fetchedData = await fetchTodoList(status);
      if (fetchedData instanceof Error === false) {
        setTodoList(fetchedData.data);
      }

      if (fetchedData instanceof Error === false && fetchedData.info) {
        setTodoListInfo(fetchedData.info);
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    updateTasks(status);
  }, []);

  return (
    <>
      <AddTodo
        status={status}
        updateTasks={updateTasks}
      />
      <StatusNavigation
        status={status}
        setStatus={setStatus}
        updateTasks={updateTasks}
        todoListInfo={todoListInfo}
      />
      <TodoList
        status={status}
        todoList={todoList}
        updateTasks={updateTasks}
      />
    </>
  );
};

export default TodoListPage;
