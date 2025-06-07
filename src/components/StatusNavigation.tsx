import { Tabs, Flex } from "antd";
import type { TodoInfo, TodoStatus } from "../types/types";

interface StatusNavigationProps {
  todoListInfo: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
}

const StatusNavigation = ({
  todoListInfo,
  setStatus,
}: StatusNavigationProps) => {
  const hasValidStatus = (str: string): str is TodoStatus => {
    return str === "all" || str === "inWork" || str === "completed";
  };

  const handleClick = (newStatus: string) => {
    if (hasValidStatus(newStatus)) {
      setStatus(newStatus);
    }
    return;
  };

  return (
    <Flex>
      <Tabs
        size="large"
        tabBarGutter={58}
        centered
        onChange={(key) => handleClick(key)}
        items={[
          { label: `All (${todoListInfo.all})`, key: "all" },
          { label: `In work (${todoListInfo.inWork})`, key: "inWork" },
          { label: `Completed (${todoListInfo.completed})`, key: "completed" },
        ]}
      />
    </Flex>
  );
};

export default StatusNavigation;
