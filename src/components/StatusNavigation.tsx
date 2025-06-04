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
  function handleClick(newStatus: TodoStatus) {
    setStatus(newStatus);
  }

  return (
    <Flex>
      <Tabs
        size="large"
        tabBarGutter={58}
        centered
        onChange={(key) => handleClick(key as TodoStatus)}
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
