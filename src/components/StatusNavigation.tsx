import type { todoStatus, Todo } from "../types";
import { fetchTodoList } from "../api/todo";
import classes from "./StatusNavigation.module.css";

export default function StatusNavigation({
  status,
  setStatus,
  setTodoList,
}: {
  setStatus: React.Dispatch<React.SetStateAction<todoStatus>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: todoStatus;
}) {
  //
  function handleClick(event: React.SyntheticEvent<HTMLLIElement>) {
    const statusBtnText = String(event.currentTarget.innerText);

    switch (statusBtnText) {
      case "All":
        setStatus("all");
        break;
      case "In work":
        setStatus("inWork");
        break;
      case "Completed":
        setStatus("completed");
        break;
    }

    (async () => {
      const fetchedData = await fetchTodoList(status);
      setTodoList(fetchedData.data);
    })();
  }

  return (
    <nav className={classes["status-list-wrapper"]}>
      <ul className={classes["status-list"]}>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "all" && classes["active"]}`}
          onClick={handleClick}
        >
          All
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "inWork" && classes["active"]}`}
          onClick={handleClick}
        >
          In work
        </li>
        <li
          className={`${classes["status-list-item"]} 
          ${status === "completed" && classes["active"]}`}
          onClick={handleClick}
        >
          Completed
        </li>
      </ul>
    </nav>
  );
}
