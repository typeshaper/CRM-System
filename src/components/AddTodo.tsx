import classes from "./AddTodo.module.css";
import type { Todo, TodoRequest } from "../types";

export default function AddTodo() {
  return (
    <form method="POST">
      <input
        type="text"
        placeholder="Enter your task..."
        name="title"
      />
      <button>Add</button>
    </form>
  );
}
