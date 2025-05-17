import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import type { Todo, todoStatus } from "./types";
import { fetchTodoList } from "./api/todo";
import StatusNavigation from "./components/StatusNavigation";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [status, setStatus] = useState("all" as todoStatus);

  useEffect(() => {
    const timerId = setInterval(() => {
      (async () => {
        const fetchedData = await fetchTodoList("all");
        setTodoList(fetchedData.data);
      })();
    }, 10000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    async function getItems() {
      setIsFetching(true);

      const fetchedData = await fetchTodoList("all");
      setTodoList(fetchedData.data);
      setIsFetching(false);
    }
    getItems();
  }, []);

  return (
    <>
      <AddTodo
        status={status}
        setTodoList={setTodoList}
      />
      <StatusNavigation
        status={status}
        setStatus={setStatus}
        todoList={todoList}
        setTodoList={setTodoList}
      />
      <TodoList
        status={status}
        todoList={todoList}
        setTodoList={setTodoList}
        isFetching={isFetching}
      />
    </>
  );
}

export default App;
