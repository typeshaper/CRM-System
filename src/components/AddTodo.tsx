import classes from "./AddTodo.module.css";
import type { Todo } from "../types";
import { useState } from "react";
import { createTodoItem } from "../api/todo";
import useInput from "../hooks/useInput";
import { isValidLength } from "../utility/validation";
import { fetchTodoList } from "../api/todo";

export default function AddTodo({
  setTodoList,
}: {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const [isUploadingTask, setIsUploadingTask] = useState(false);

  const {
    value: titleValue,
    handleInputBlur: handleTitleBlur,
    handleInputChange: handleTitleChange,
    hasError: titleHasError,
    resetInput: resetTitle,
  } = useInput("", (value) => isValidLength(value));

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (titleHasError) return;

    (async () => {
      setIsUploadingTask(true);
      await createTodoItem(titleValue);
      const fetchedData = await fetchTodoList();
      setTodoList(fetchedData.data);
      setIsUploadingTask(false);
      resetTitle();
    })();
  }

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
