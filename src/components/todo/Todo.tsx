import React from "react";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import "./styles/Todo.css";

const { useState } = React;

interface TodoInterface {
  id: number;
  todo: string;
  done: boolean;
}

interface Props {
  mode: "light" | "dark";
  todoList: TodoInterface[] | null;
  getTodo: (id?: number) => void;
  deleteTodo: (id?: number) => void;
  updateTodo: (todo: TodoInterface) => void;
  setClickedTodoId: (clickedTodoId: number) => void;
}

const Todo: React.FC<Props> = ({
  mode,
  todoList,
  getTodo,
  deleteTodo,
  updateTodo,
  setClickedTodoId,
}) => {
  const [constructorHasRun, setConstructorHasRun] = useState<boolean>(false);
  const constructor = () => {
    if (!constructorHasRun) {
      getTodo();
      setConstructorHasRun(true);
    }
  };
  constructor();
  return (
    <div className="todo-container">
      <h1
        style={{
          color: mode === "light" ? "black" : "white",
          textAlign: "center",
        }}
      >
        Create your To-Do List for today
      </h1>
      <Link to="create" className="todo-btns">
        Add To-Do
      </Link>
      <Link
        to=""
        className="todo-btns"
        onClick={() => {
          deleteTodo();
          setConstructorHasRun(false);
        }}
      >
        Clear
      </Link>
      <div
        className="todos"
        style={{
          backgroundColor: mode === "light" ? "lightgreen" : "#183618",
          borderColor: mode === "light" ? "black" : "white",
        }}
      >
        {todoList &&
          todoList.map((element) => {
            return (
              <TodoItem
                mode={mode}
                element={element}
                key={element.id}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                setConstructorHasRun={setConstructorHasRun}
                setClickedTodoId={setClickedTodoId}
              />
            );
          })}
        {(!todoList || todoList.length === 0) && (
          <h1 style={{ color: mode === "light" ? "black" : "white" }}>
            No Entry
          </h1>
        )}
      </div>
    </div>
  );
};

export default Todo;
