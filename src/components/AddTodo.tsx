import React, { useState } from "react";
import { createTodoItem } from "../api/todo";
import { hasValidTodoTitle } from "../utility/validation";

interface AddTodoProps {
  updateTasks: () => void;
}

const AddTodo = ({ updateTasks }: AddTodoProps) => {
  const [addingTaskError, setAddingTaskError] = useState<Error>();
  const [isUploadingTask, setIsUploadingTask] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [didEdit, setDidEdit] = useState<boolean>(false);
  const isValidTitle = hasValidTodoTitle(titleValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setDidEdit(false);
  };

  const handleBlur = () => {
    setDidEdit(true);
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidTitle) {
      return;
    }
    setDidEdit(false);
    setIsUploadingTask(true);

    try {
      await createTodoItem(titleValue);
      updateTasks();
      setTitleValue("");
    } catch (error) {
      if (error instanceof Error) {
        setAddingTaskError(error);
      }
    }
    setIsUploadingTask(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        name="title"
        value={titleValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isUploadingTask}
      />
      {addingTaskError && <p>{addingTaskError.message}</p>}
      {!isValidTitle && didEdit && (
        <p>Title must be between 2 and 64 characters long!</p>
      )}
      {isUploadingTask && <p>Saving task...</p>}
      <button
        type="submit"
        disabled={isUploadingTask}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
