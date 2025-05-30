import TodoItem from "./TodoItem";
import type { Todo } from "../types/types";

interface TodoListProps {
  todoList: Todo[];
  updateTasks: () => void;
}

const TodoList = ({ todoList, updateTasks }: TodoListProps) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTasks={updateTasks}
        />
      ))}
    </ul>
  );
};

export default TodoList;
