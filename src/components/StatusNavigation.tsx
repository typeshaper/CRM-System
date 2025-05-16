import type { todoStatus, Todo } from "../types";
import { fetchTodoList } from "../api/todo";

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
    console.log(statusBtnText);

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
    <nav>
      <ul>
        <li onClick={handleClick}>All</li>
        <li onClick={handleClick}>In work</li>
        <li onClick={handleClick}>Completed</li>
      </ul>
    </nav>
  );
}
