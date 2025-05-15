import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import type { Todo } from "./types";
import { fetchTodoList } from "./api/todo";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getItems() {
      setIsFetching(true);

      const fetchedData = await fetchTodoList();
      setTodoList(fetchedData.data);
      setIsFetching(false);
    }
    getItems();
  }, []);

  return (
    <>
      <AddTodo setTodoList={setTodoList} />
      <TodoList
        todoList={todoList}
        isFetching={isFetching}
      />
    </>
  );
}

export default App;
