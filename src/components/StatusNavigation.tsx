import type { TodoStatus, TasksCounter } from "../types/types";
import classes from "./StatusNavigation.module.css";

interface StatusNavigationProps {
  status: TodoStatus;
  tasksCounter: TasksCounter;
  setStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
  updateTasks: (status: TodoStatus) => void;
}

const StatusNavigation = ({
  status,
  tasksCounter,
  setStatus,
  updateTasks,
}: StatusNavigationProps) => {
  const handleClick = (newStatus: TodoStatus) => {
    setStatus(newStatus);
    updateTasks(newStatus);
  };

  return (
    <nav className={classes["status-list-wrapper"]}>
      <ul className={classes["status-list"]}>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "all" && classes["active"]}`}
          onClick={() => handleClick("all")}
        >
          All ({tasksCounter.allTasksCounter})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "inWork" && classes["active"]}`}
          onClick={() => handleClick("inWork")}
        >
          In work ({tasksCounter.inWorkTasksCounter})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "completed" && classes["active"]}`}
          onClick={() => handleClick("completed")}
        >
          Completed ({tasksCounter.completedTasksCounter})
        </li>
      </ul>
    </nav>
  );
};

export default StatusNavigation;
