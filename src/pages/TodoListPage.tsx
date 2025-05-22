import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import type { Todo, todoStatus } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";

const TodoListPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [status, setStatus] = useState("all" as todoStatus);
  const [tasksCounter, setTasksCounter] = useState({
    allTasksCounter: 0,
    inWorkTasksCounter: 0,
    completedTasksCounter: 0,
  });

  const updateTaskCounter = async () => {
    const taskCounters = await fetchTodoList("all");
    if (taskCounters instanceof Error) return;
    const allTasksCounter = taskCounters!.info!.all;
    const inWorkTasksCounter = taskCounters!.info!.inWork;
    const completedTasksCounter = taskCounters!.info!.completed;

    setTasksCounter(() => ({
      allTasksCounter,
      inWorkTasksCounter,
      completedTasksCounter,
    }));
  };

  const updateTasks = async (status: todoStatus) => {
    const fetchedData = await fetchTodoList(status);

    if (fetchedData instanceof Error === false) {
      setTodoList(fetchedData.data);
      updateTaskCounter();
    }
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
};

export default TodoListPage;
