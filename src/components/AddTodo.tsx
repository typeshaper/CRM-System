import { useFetcher } from "react-router";
import classes from "./AddTodo.module.css";
import type { Todo, TodoRequest } from "../types";

export default function AddTodo() {
  const fetcher = useFetcher();
  const data = fetcher.data;

  console.log(data);
  let errorMessage = <></>;
  if (data && data.errorMessage) {
    errorMessage = (
      <p className={classes["validation-error"]}>{data.errorMessage}</p>
    );
  }

  return (
    <fetcher.Form method="POST">
      {errorMessage}
      <input
        type="text"
        placeholder="Enter your task..."
        name="title"
      />
      <button>Add</button>
    </fetcher.Form>
  );
}

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const title = String(data.get("title"));
  const todoData: TodoRequest = {
    title,
    isDone: false,
  };

  if (title.length > 64 || title.length < 2) {
    let errorMessage = "Title must be between 2 and 64 characters long!";
    return new Response(JSON.stringify({ errorMessage }), {
      status: 400,
    }).json();
  }

  const response: Response = await fetch("https://easydev.club/api/v1/todos", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (response.status === 500) {
    throw new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }

  if (response.status === 400) {
    throw new Response(JSON.stringify({ message: "Validation failed!" }), {
      status: 400,
    });
  }

  const resData: Todo = await response.json();
  return resData;
}
