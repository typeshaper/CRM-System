import type { CSSProperties } from "react";
import type { TodoInfo, TodoStatus } from "../types/types";
import { Tabs, Flex, type TabsProps } from "antd";

interface StatusNavigationProps {
  todoListInfo: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
  status: TodoStatus;
}

const flexStyle: CSSProperties = {
  width: "100%",
};

const tabsStyle: CSSProperties = {
  width: "100%",
};

const StatusNavigation = ({
  todoListInfo,
  setStatus,
}: StatusNavigationProps) => {
  function handleClick(newStatus: string) {
    if (
      newStatus === "all" ||
      newStatus === "inWork" ||
      newStatus === "completed"
    ) {
      setStatus(newStatus);
    }
  }

  return (
    <Flex style={flexStyle}>
      <Tabs
        size="large"
        style={tabsStyle}
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
