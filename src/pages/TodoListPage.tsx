import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState, type CSSProperties } from "react";
import type { Todo, TodoStatus, TodoInfo } from "../types/types";
import { fetchTodoList } from "../api/todo";
import StatusNavigation from "../components/StatusNavigation";
import { Layout } from "antd";

const layoutStyle: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
};

const contentStyle: CSSProperties = {
  width: "65ch",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
};

const TodoListPage = () => {
  const { Content } = Layout;
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
