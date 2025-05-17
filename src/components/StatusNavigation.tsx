import type { todoStatus, Todo } from "../types";
import { fetchTodoList } from "../api/todo";
import classes from "./StatusNavigation.module.css";
import { useEffect, useState } from "react";

export default function StatusNavigation({
  status,
  setStatus,
  setTodoList,
  todoList,
}: {
  setStatus: React.Dispatch<React.SetStateAction<todoStatus>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoList: Todo[];
  status: todoStatus;
}) {
  const [tasksQuantity, setTasksQuantity] = useState({
    allTasksQuantity: 0,
    inWorkTasksQuantity: 0,
    completedTasksQuantity: 0,
  });

  function handleClick(status: todoStatus) {
    setStatus(status);
  }

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchTodoList("all");
      const todoList = fetchedData.data;

      const allTasksQuantity = todoList.length;
      const inWorkTasksQuantity = todoList.filter(
        (item) => !item.isDone
      ).length;
      const completedTasksQuantity = todoList.filter(
        (item) => item.isDone
      ).length;

      setTasksQuantity(() => ({
        allTasksQuantity,
        inWorkTasksQuantity,
        completedTasksQuantity,
      }));
    })();
  }, [todoList]);

  return (
    <nav className={classes["status-list-wrapper"]}>
      <ul className={classes["status-list"]}>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "all" && classes["active"]}`}
          onClick={() => handleClick("all")}
        >
          All ({tasksQuantity.allTasksQuantity})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "inWork" && classes["active"]}`}
          onClick={() => handleClick("inWork")}
        >
          In work ({tasksQuantity.inWorkTasksQuantity})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "completed" && classes["active"]}`}
          onClick={() => handleClick("completed")}
        >
          Completed ({tasksQuantity.completedTasksQuantity})
        </li>
      </ul>
    </nav>
  );
}
