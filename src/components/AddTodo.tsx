import classes from "./AddTodo.module.css";
import { useState } from "react";
import { createTodoItem } from "../api/todo";
import useInput from "../hooks/useInput";
import { isValidLength } from "../utility/validation";
import type { todoStatus } from "../types/types";

export default function AddTodo({
  updateTasks,
  status,
}: {
  updateTasks: (status: todoStatus) => void;
  status: todoStatus;
}) {
  const [isUploadingTask, setIsUploadingTask] = useState(false);

  const {
    value: titleValue,
    handleInputBlur: handleTitleBlur,
    handleInputChange: handleTitleChange,
    hasError: titleHasError,
    resetInput: resetTitle,
  } = useInput("", (value) => isValidLength(value));

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (titleHasError || titleValue.length === 0) return;
    setIsUploadingTask(true);

    resetTitle();
    await createTodoItem(titleValue);
    updateTasks(status);
    setIsUploadingTask(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        name="title"
        value={titleValue}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />
      {titleHasError && (
        <p className={classes["validation-error"]}>
          Title must be between 2 and 64 characters long!
        </p>
      )}
      {isUploadingTask && (
        <p className={classes["saving-status"]}>Saving task...</p>
      )}
      <button
        className={classes["add-task-button"]}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
