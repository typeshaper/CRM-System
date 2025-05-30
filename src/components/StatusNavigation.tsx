import type { TodoInfo, TodoStatus } from "../types/types";
import classes from "./StatusNavigation.module.css";

interface StatusNavigationProps {
  todoListInfo: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
  status: TodoStatus;
}

const StatusNavigation = ({
  todoListInfo,
  setStatus,
  status,
}: StatusNavigationProps) => {
  const handleClick = (newStatus: TodoStatus) => {
    setStatus(newStatus);
  };

  return (
    <nav className={classes["status-list-wrapper"]}>
      <ul className={classes["status-list"]}>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "all" && classes["active"]}`}
          onClick={() => handleClick("all")}
        >
          All ({todoListInfo.all})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "inWork" && classes["active"]}`}
          onClick={() => handleClick("inWork")}
        >
          In work ({todoListInfo.inWork})
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "completed" && classes["active"]}`}
          onClick={() => handleClick("completed")}
        >
          Completed ({todoListInfo.completed})
        </li>
      </ul>
    </nav>
  );
};

export default StatusNavigation;
