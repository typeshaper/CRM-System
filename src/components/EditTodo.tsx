import { isValidLength } from "../utility/validation";
import useInput from "../hooks/useInput";
import { editTodo } from "../api/todo";
import type { Todo, todoStatus } from "../types";
import { fetchTodoList } from "../api/todo";
import classes from "./EditTodo.module.css";
import saveIcon from "../assets/save.svg";
import undoIcon from "../assets/undo.svg";

export default function EditTodo({
  title,
  id,
  setTodoList,
  setIsEditing,
  status,
}: {
  title: string;
  id: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: todoStatus;
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
      | React.SyntheticEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    if (titleHasError) return;

    setTodoList((prevTodoList) => {
      const index = prevTodoList.findIndex((item) => item.id === id);
      const newTodoList = structuredClone(prevTodoList);
      newTodoList[index].title = titleValue;
      return newTodoList;
    });

    setIsEditing(false);
    (async () => {
      await editTodo(id, { title: titleValue });
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
    })();
  }

  function handleUndoButton() {
    setIsEditing(false);
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
          <button
            type="button"
            onClick={handleSubmit}
            className={classes["undo-button"]}
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
}
