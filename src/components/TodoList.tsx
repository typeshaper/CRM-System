import TodoItem from "./TodoItem";
import type { Todo } from "../types/types";
import { List } from "antd";
import type { CSSProperties } from "react";

interface TodoListProps {
  todoList: Todo[];
  updateTasks: () => void;
}

const listStyle: CSSProperties = {
  width: "100%",
};

const TodoList = ({ todoList, updateTasks }: TodoListProps) => {
  return (
    <List style={listStyle}>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTasks={updateTasks}
        />
      ))}
    </List>
  );
};

export default TodoList;
