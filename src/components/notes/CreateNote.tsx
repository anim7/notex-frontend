import React from "react";
import { Link } from "react-router-dom";
import "./styles/notes_styles/CreateNote.css";

const { useState } = React;

interface NoteToPost {
  title: string;
  text: string;
}

interface Props {
  mode: "light" | "dark";
  addNote: (note: NoteToPost) => void;
  clickedOnNote: boolean;
  clickedNoteId?: number;
  notes?: NoteToPost[] | null | undefined;
  updateNote?: (note: NoteToPost) => void;
}

const CreateNote: React.FC<Props> = ({
  mode,
  addNote,
  clickedOnNote,
  clickedNoteId,
  notes,
  updateNote,
}) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [constructorHasRun, setConstructorHasRun] = useState<boolean>(false);
  const [eraseKeyPressed, setErasedKeyPressed] = useState<boolean>(false);
  const getInfo = () => {
    if (clickedOnNote && notes) {
      setTitle(notes[0].title);
      setText(notes[0].title);
    } else {
      setTitle("");
      setText("");
    }
  };
  const constructor = () => {
    if (!constructorHasRun) {
      getInfo();
      setConstructorHasRun(true);
    }
  };
  constructor();
  return (
    <div className="create-container">
      <input
        type="text"
        placeholder="Title"
        className="title"
        id="title"
        value={title}
        onKeyDown={(e) => {
          if (e.code === "Backspace" || e.code === "Delete") {
            setErasedKeyPressed(true);
          } else {
            setErasedKeyPressed(false);
          }
        }}
        onChange={(ev) => {
          if (title.length >= 255 && !eraseKeyPressed) {
            alert("cannot add more characters");
          } else {
            setTitle(ev.target.value);
          }
        }}
        style={{
          backgroundColor: mode === "light" ? "white" : "rgb(41, 41, 41)",
          color: mode === "light" ? "black" : "white",
          borderColor: mode === "light" ? "black" : "white",
        }}
      />
      <textarea
        name="text"
        id="text"
        cols={70}
        rows={22}
        className="textarea"
        value={text}
        onKeyDown={(e) => {
          if (e.code === "Backspace" || e.code === "Delete") {
            setErasedKeyPressed(true);
          } else {
            setErasedKeyPressed(false);
          }
        }}
        onChange={(ev) => {
          if (text.length >= 255 && !eraseKeyPressed) {
            alert("cannot add more characters");
          } else {
            setText(ev.target.value);
          }
        }}
        style={{
          backgroundColor: mode === "light" ? "white" : "rgb(41, 41, 41)",
          color: mode === "light" ? "black" : "white",
          borderColor: mode === "light" ? "black" : "white",
        }}
      />
      <Link
        to="/notes"
        className="save"
        onClick={() => {
          const title = document.getElementById("title")! as HTMLInputElement;
          const text = document.getElementById("text")! as HTMLInputElement;
          if (title.value.length > 0 && text.value.length > 0) {
            if (!clickedOnNote) {
              const note = {
                title: title.value,
                text: text.value,
              };
              addNote(note);
            } else {
              const note = {
                id: clickedNoteId,
                title: title.value,
                text: text.value,
              };
              if (updateNote) updateNote(note);
            }
          } else {
            alert("Could not save as all the fields were not filled");
          }
        }}
      >
        Save
      </Link>
    </div>
  );
};

export default CreateNote;
