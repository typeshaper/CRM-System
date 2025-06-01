import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState, type CSSProperties } from "react";
import type { Todo, TodoStatus, TodoInfo } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";
import { Layout, Menu } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";

const layoutStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
};

const contentStyle: CSSProperties = {
  width: "75ch",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "1rem 2rem",
};
const siderStyle: CSSProperties = {
  padding: "1rem 0",
  backgroundColor: "#FFF",
  border: "none",
};
const TodoListPage = () => {
  const { Content, Sider } = Layout;
  const [hasFetchingError, setHasFetchingError] = useState<boolean>(false);
  const [status, setStatus] = useState<TodoStatus>("all");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListInfo, setTodoListInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const updateTasks = async () => {
    try {
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
      if (fetchedData.info) {
        setTodoListInfo(fetchedData.info);
      }
    } catch (error) {
      setHasFetchingError(true);
    }
  };

  useEffect(() => {
    updateTasks();
  }, [status]);

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={250}
        style={siderStyle}
      >
        <Menu
          style={siderStyle}
          items={[
            { key: "tasks", label: "Tasks", icon: <FileDoneOutlined /> },
            { key: "profile", label: "Profile", icon: <UserOutlined /> },
          ]}
        />
      </Sider>
      <Content style={contentStyle}>
        <AddTodo updateTasks={updateTasks} />
        <StatusNavigation
          setStatus={setStatus}
          todoListInfo={todoListInfo}
          status={status}
        />
        <TodoList
          todoList={todoList}
          updateTasks={updateTasks}
        />
        {hasFetchingError && <p>Failed to fetch to-do list...</p>}
      </Content>
    </Layout>
  );
};

export default TodoListPage;
