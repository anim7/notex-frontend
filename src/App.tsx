import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Todo from "./components/Todo";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";

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
  const [notes, setNotes] = useState<Note[] | null>();
  const url = "http://localhost:8080";
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [checked, setChecked] = useState<boolean>(false);
  const [clickedNoteId, setClickedNoteId] = useState<number>(0);
  const toggleMode = () => {
    if (!checked) {
      setMode("dark");
      document.body.style.backgroundColor = "#070926";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "lightblue";
    }
  };

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
        console.error(err);
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
    axios
      .post(`${url}/api/notes`, note)
      .then((res: AxiosResponse) => setNotes(res.data));
  };

  const updateNote = (note: NoteToPost) => {
    axios.put(`${url}/api/notes`, note);
  };

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
            />
          }
        />
        <Route path="/todo" element={<Todo mode={mode} />} />
        <Route
          path="/notes/create"
          element={
            <CreateNote mode={mode} addNote={addNote} clickedOnNote={false} />
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
      </Routes>
    </>
  );
};

export default App;
