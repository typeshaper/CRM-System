import TodoItem from "./TodoItem";
import classes from "./TodoList.module.css";
import type { Todo, todoStatus } from "../types/types";

interface TodoListProps {
  status: todoStatus;
  todoList: Todo[];
  updateTasks: (status: todoStatus) => void;
}

const TodoList = ({ status, todoList, updateTasks }: TodoListProps) => {
  return (
    <ul className={classes.list}>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTasks={updateTasks}
          status={status}
        />
      ))}
    </ul>
  );
};

export default TodoList;
