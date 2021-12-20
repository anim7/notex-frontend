import React from "react";
import { Link } from "react-router-dom";
import "./styles/TodoItem.css";

const { useState } = React;

interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

interface Props {
  mode: "light" | "dark";
  element: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id?: number) => void;
  setConstructorHasRun: (constructorHasRun: boolean) => void;
  setClickedTodoId: (clickedTodoId: number) => void;
}

const TodoItem: React.FC<Props> = ({
  mode,
  element,
  updateTodo,
  deleteTodo,
  setConstructorHasRun,
  setClickedTodoId,
}) => {
  const [currElement, setCurrElement] = useState<Todo>(element);
  return (
    <div
      className={`todo`}
      style={{
        border: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <button
        style={{
          backgroundColor: currElement.done
            ? mode === "light"
              ? "rgb(58 62 61)"
              : "#707070"
            : mode === "light"
            ? "#b7dbd1"
            : "#0b3e32",
          color: mode === "light" ? "black" : "white",
          borderColor: mode === "light" ? "black" : "#646363",
        }}
        className={`todo`}
        onClick={() => {
          const newtodo = {
            id: currElement.id,
            todo: currElement.todo,
            done: !currElement.done,
          };
          setCurrElement(newtodo);
          updateTodo(newtodo);
        }}
      >
        <h3
          style={{ textDecoration: currElement.done ? "line-through" : "none" }}
        >
          {currElement.todo}
        </h3>
        <input
          type="checkbox"
          name="check"
          className="check-box"
          checked={currElement.done}
          onChange={() => {
            element = currElement;
          }}
        />
      </button>
      <div className="todoitem-btns-container" onClick={() => {}}>
        <Link
          to=""
          id="todoitem-del-btn"
          className="del-btn todoitem-btns"
          onClick={() => {
            deleteTodo(currElement.id);
            setConstructorHasRun(false);
          }}
        >
          Delete
        </Link>
        <Link
          to={`edit/${currElement.id}`}
          id="todoitem-edit-btn"
          className="edit-btn todoitem-btns"
          onClick={() => {
            setClickedTodoId(currElement.id);
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TodoItem;
