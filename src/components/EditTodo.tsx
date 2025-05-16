import { isValidLength } from "../utility/validation";
import useInput from "../hooks/useInput";
import { editTodo } from "../api/todo";
import type { Todo } from "../types";
import { fetchTodoList } from "../api/todo";
import classes from "./EditTodo.module.css";
import saveIcon from "../assets/save.svg";
import deleteIcon from "../assets/delete.svg";

export default function EditTodo({
  title,
  id,
  setTodoList,
  setIsEditing,
  handleDeleteButton,
}: {
  title: string;
  id: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleDeleteButton: () => void;
}) {
  const {
    value: titleValue,
    handleInputBlur: handleTitleBlur,
    handleInputChange: handleTitleChange,
    hasError: titleHasError,
  } = useInput(title, (value) => isValidLength(value));

  function handleSubmit(
    event:
      | React.SyntheticEvent<HTMLFormElement>
      | React.SyntheticEvent<HTMLImageElement>
  ) {
    if (event) event.preventDefault();
    (async () => {
      await editTodo(id, { title: titleValue });
      const fetchedData = await fetchTodoList();
      setTodoList(fetchedData.data);
      setIsEditing(false);
    })();
  }
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
          <img
            onClick={handleSubmit}
            src={saveIcon}
          />
        </div>

        <div className={classes["delete-icon-wrapper"]}>
          <img
            onClick={handleDeleteButton}
            src={deleteIcon}
          />
        </div>
      </div>
      {titleHasError && (
        <p className={classes["validation-error"]}>
          Title must be between 2 and 64 characters long!
        </p>
      )}
    </form>
  );
}
