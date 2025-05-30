import type { TodoInfo, TodoStatus } from "../types/types";

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
    <nav>
      <ul>
        <li onClick={() => handleClick("all")}>All ({todoListInfo.all})</li>
        <li onClick={() => handleClick("inWork")}>
          In work ({todoListInfo.inWork})
        </li>
        <li onClick={() => handleClick("completed")}>
          Completed ({todoListInfo.completed})
        </li>
      </ul>
    </nav>
  );
};

export default StatusNavigation;
