import { Form, useActionData } from "react-router";
import classes from "./AddTodo.module.css";
import type { Todo, TodoRequest } from "../types";
import { useState } from "react";

export default function AddTodo() {
  const actionData = useActionData();

  const [inputValue, setInputValue] = useState("");
  function submitHandler() {
    setInputValue("");
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  return (
    <Form
      onSubmit={submitHandler}
      method="POST"
    >
      <input
        type="text"
        placeholder="Enter your task..."
        min="2"
        max="64"
        name="title"
        required
        value={inputValue}
        onChange={changeHandler}
      />
      <button>Add</button>
    </Form>
  );
}

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const title = data.get("title")?.toString();
  const todoData: TodoRequest = {
    title,
    isDone: false,
  };

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
