import React from "react";
import { Link } from "react-router-dom";
import "./styles/CreateTodo.css";

const { useState } = React;

interface Todo {
  todo: string;
  done: boolean;
}

interface TodoGet {
  id: number;
  todo: string;
  done: boolean;
}

interface Props {
  mode: "light" | "dark";
  addTodo: (todo: Todo) => void;
  clickedTodoId: number;
  clickedTodo: boolean;
  updateTodo: (todo: TodoGet) => void;
  getTodo: (id?: number) => void;
  todos: TodoGet[] | null;
}

const CreateTodo: React.FC<Props> = ({
  mode,
  addTodo,
  clickedTodo,
  clickedTodoId,
  updateTodo,
  getTodo,
  todos,
}) => {
  const [constructorHasRun, setConstructorHasRun] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>("");
  const [eraseKeyPressed, setEraseKeyPressed] = useState<boolean>(false);
  const constructor = () => {
    if (!constructorHasRun) {
      if (clickedTodo) {
        getTodo(clickedTodoId);
        if (todos) {
          setTodoText(todos[0].todo);
        }
      }
      setConstructorHasRun(true);
    }
  };
  constructor();
  return (
    <div className="create-todo-container">
      <input
        type="text"
        id="text-todo-create"
        className="todo-text"
        placeholder="To-Do"
        style={{
          backgroundColor: mode === "light" ? "white" : "rgb(41, 41, 41)",
          color: mode === "light" ? "black" : "white",
          borderColor: mode === "light" ? "black" : "white",
        }}
        value={todoText}
        onKeyDown={(e) => {
          if (e.code === "Backspace" || e.code === "Delete") {
            setEraseKeyPressed(true);
          } else {
            setEraseKeyPressed(false);
          }
        }}
        onChange={(ev) => {
          if (todoText.length >= 255 && !eraseKeyPressed) {
            alert("Cannot add more characters");
          } else {
            setTodoText(ev.target.value);
          }
        }}
      />
      <Link
        to="/todo"
        className="btn-save"
        onClick={async () => {
          const todoText = document.getElementById(
            "text-todo-create"
          )! as HTMLInputElement;
          if (!clickedTodo) {
            const todo = {
              todo: todoText.value,
              done: false,
            };
            if (todo.todo.length > 0) {
              await addTodo(todo);
            } else {
              alert("Cannot add To-Do as the field is empty");
            }
          } else {
            if (todos) {
              const todo = {
                id: todos[0].id,
                todo: todoText.value,
                done: todos[0].done,
              };
              await updateTodo(todo);
            }
          }
        }}
      >
        Save
      </Link>
    </div>
  );
};

export default CreateTodo;
