import classes from "./AddTodo.module.css";
import type { Todo, todoStatus } from "../types";
import { useState } from "react";
import { createTodoItem } from "../api/todo";
import useInput from "../hooks/useInput";
import { isValidLength } from "../utility/validation";
import { fetchTodoList } from "../api/todo";

export default function AddTodo({
  setTodoList,
  status,
}: {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
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

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (titleHasError || titleValue.length === 0) return;

    const title = titleValue;
    (async () => {
      setIsUploadingTask(true);
      // Создает временную дамми тудушку чтобы был инста отклик
      setTodoList((prev) => {
        const newTodoList = structuredClone(prev);
        newTodoList.push({
          title: title,
          id: 0,
          isDone: false,
          created: "",
        });

        return newTodoList;
      });
      resetTitle();
      await createTodoItem(title);
      // Подгружает уже реальные данные в стейт
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
      setIsUploadingTask(false);
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
