import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Notes from "./components/notes/Notes";
import Todo from "./components/todo/Todo";
import CreateNote from "./components/notes/CreateNote";
import Note from "./components/notes/Note";
import CreateTodo from "./components/todo/CreateTodo";

const { useState } = React;

const App: React.FC = () => {
  interface Note {
    id: number;
    title: string;
    text: string;
  }

  interface NoteToPost {
    title: string;
    text: string;
  }

  interface Todo {
    id: number;
    todo: string;
    done: boolean;
  }

  interface TodoToPost {
    todo: string;
    done: boolean;
  }

  const [notes, setNotes] = useState<Note[] | null>();
  const url = "http://localhost:8080";
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [checked, setChecked] = useState<boolean>(false);
  const [clickedNoteId, setClickedNoteId] = useState<number>(0);
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [clickedTodoId, setClickedTodoId] = useState<number>(0);

  const toggleMode = () => {
    if (!checked) {
      setMode("dark");
      document.body.style.backgroundColor = "#070926";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "lightblue";
    }
  };

  //notes functions start
  const fetchNotes = async (id?: number) => {
    let idParam: string = "";
    if (id) {
      idParam = `?id=${id}`;
    }
    await axios
      .get(`${url}/api/notes${idParam}`)
      .then((res: AxiosResponse) => {
        setNotes(res.data);
      })
      .catch((err: AxiosError) => {
        setNotes(null);
      });
  };

  const deleteNote = (id?: number) => {
    let idParam = "";
    if (id) {
      idParam = `?id=${id}`;
    }
    axios.delete(`${url}/api/notes${idParam}`);
  };

  const addNote = (note: NoteToPost) => {
    axios.post(`${url}/api/notes`, note);
  };

  const updateNote = (note: NoteToPost) => {
    axios.put(`${url}/api/notes`, note);
  };
  //notes functions end

  //todo functions start
  const getTodo = (id?: number) => {
    let idParam = "";
    if (id) {
      idParam = `?id=${id}`;
    }
    axios
      .get(`${url}/api/todo${idParam}`)
      .then((res: AxiosResponse) => {
        setTodoList(res.data);
      })
      .catch((err: AxiosError) => {
        setTodoList(null);
      });
  };

  const addTodo = (todo: TodoToPost) => {
    axios.post(`${url}/api/todo`, todo);
  };

  const deleteTodo = (id?: number) => {
    let idParam = "";
    if (id) {
      idParam = `?id=${id}`;
    }
    axios.delete(`${url}/api/todo${idParam}`);
  };

  const updateTodo = (todo: TodoToPost) => {
    axios.put(`${url}/api/todo`, todo);
  };
  //todo functions end

  return (
    <>
      <NavBar
        mode={mode}
        toggleMode={toggleMode}
        setChecked={setChecked}
        checked={checked}
      />
      <Routes>
        <Route path="/" element={<Home mode={mode} />} />
        <Route
          path="/notes"
          element={
            <Notes
              mode={mode}
              notes={notes}
              fetchNotes={fetchNotes}
              setClickedNoteId={setClickedNoteId}
              deleteNote={deleteNote}
            />
          }
        />
        <Route
          path="/todo"
          element={
            <Todo
              mode={mode}
              todoList={todoList}
              getTodo={getTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              setClickedTodoId={setClickedTodoId}
            />
          }
        />
        <Route
          path="/notes/create"
          element={
            <CreateNote
              mode={mode}
              addNote={addNote}
              clickedOnNote={false}
              clickedNoteId={clickedNoteId}
              notes={notes}
              updateNote={updateNote}
            />
          }
        />
        <Route
          path={`/notes/${clickedNoteId}`}
          element={
            <Note
              mode={mode}
              notes={notes}
              deleteNote={deleteNote}
              clickedNoteId={clickedNoteId}
            />
          }
        />
        <Route
          path="/notes/edit"
          element={
            <CreateNote
              mode={mode}
              addNote={addNote}
              clickedNoteId={clickedNoteId}
              clickedOnNote={true}
              notes={notes}
              updateNote={updateNote}
            />
          }
        />
        <Route
          path="/todo/create"
          element={
            <CreateTodo
              mode={mode}
              addTodo={addTodo}
              clickedTodo={false}
              clickedTodoId={clickedTodoId}
              updateTodo={updateTodo}
              getTodo={getTodo}
              todos={todoList}
            />
          }
        />
        <Route
          path={`/todo/edit/${clickedTodoId}`}
          element={
            <CreateTodo
              mode={mode}
              addTodo={addTodo}
              clickedTodo={true}
              clickedTodoId={clickedTodoId}
              updateTodo={updateTodo}
              getTodo={getTodo}
              todos={todoList}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
