import { isValidLength } from "../utility/validation";
import useInput from "../hooks/useInput";
import { editTodo } from "../api/todo";
import classes from "./EditTodo.module.css";
import saveIcon from "../assets/save.svg";
import undoIcon from "../assets/undo.svg";
import type { todoStatus } from "../types/types";

interface EditTodoProps {
  title: string;
  id: number;
  status: todoStatus;
  updateTasks: (status: todoStatus) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTodo = ({
  title,
  id,
  status,
  updateTasks,
  setIsEditing,
}: EditTodoProps) => {
  const {
    value: titleValue,
    handleInputBlur: handleTitleBlur,
    handleInputChange: handleTitleChange,
    hasError: titleHasError,
  } = useInput(title, (value) => isValidLength(value));

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (titleHasError) return;

    await editTodo(id, { title: titleValue });
    updateTasks(status);
    setIsEditing(false);
  };

  const handleUndoButton = () => {
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes["edit-form"]}
    >
      <input
        className={classes["edit-input"]}
        type="text"
        name="title"
        value={titleValue}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />

      <div className={classes["icons-wrapper"]}>
        <div className={classes["save-icon-wrapper"]}>
          <button
            type="submit"
            className={classes["save-button"]}
          >
            <img
              src={saveIcon}
              className={classes["save-icon"]}
            />
          </button>
        </div>

        <div className={classes["undo-icon-wrapper"]}>
          <button
            type="button"
            onClick={handleUndoButton}
            className={classes["undo-button"]}
          >
            <img
              className={classes["undo-icon"]}
              src={undoIcon}
            />
          </button>
        </div>
      </div>
      {titleHasError && (
        <p className={classes["validation-error"]}>
          Title must be between 2 and 64 characters long!
        </p>
      )}
    </form>
  );
};

export default EditTodo;
