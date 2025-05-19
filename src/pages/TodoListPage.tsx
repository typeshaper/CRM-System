import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import type { Todo, todoStatus } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";

export default function TodoListPage() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [status, setStatus] = useState("all" as todoStatus);
  const [tasksCounter, setTasksCounter] = useState({
    allTasksCounter: 0,
    inWorkTasksCounter: 0,
    completedTasksCounter: 0,
  });

  const updateTaskCounter = async () => {
    const allTasks = await fetchTodoList("all");
    const allTasksCounter = allTasks.data.length;
    const inWorkTasks = await fetchTodoList("inWork");
    const inWorkTasksCounter = inWorkTasks.data.length;
    const completedTasks = await fetchTodoList("completed");
    const completedTasksCounter = completedTasks.data.length;
    setTasksCounter(() => ({
      allTasksCounter,
      inWorkTasksCounter,
      completedTasksCounter,
    }));
  };

  const updateTasks = async (status: todoStatus) => {
    const fetchedData = await fetchTodoList(status);
    setTodoList(fetchedData.data);
    updateTaskCounter();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      updateTasks(status);
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  }, [status]);

  useEffect(() => {
    updateTasks(status);
  }, [status]);

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
        tasksCounter={tasksCounter}
      />
      <TodoList
        status={status}
        todoList={todoList}
        updateTasks={updateTasks}
      />
    </>
  );
}
