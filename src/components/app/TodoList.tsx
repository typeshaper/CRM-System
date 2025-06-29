import { List } from "antd";
import { type CSSProperties, memo } from "react";
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todoList: Todo[];
  updateTasks: () => void;
}

const listStyle: CSSProperties = {
  width: "75ch",
};

const TodoList = memo(({ todoList, updateTasks }: TodoListProps) => {
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
});

export default TodoList;
