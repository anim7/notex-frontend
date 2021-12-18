import React from "react";
import { Link } from "react-router-dom";
import "./styles/Note.css";

interface Note1 {
  id: number;
  title: string;
  text: string;
}

interface Props {
  mode: "light" | "dark";
  notes: Note1[] | null | undefined;
  deleteNote: (id?: number) => void;
  clickedNoteId: number;
}

const Note: React.FC<Props> = ({ mode, notes, deleteNote, clickedNoteId }) => {
  return (
    <div
      className="main-note-container"
      style={{ color: mode === "light" ? "black" : "white" }}
    >
      {notes && (
        <div className="main-container">
          <div
            className="note-container"
            style={{
              backgroundColor:
                mode === "light" ? "lightgreen" : "rgb(20, 40, 37)",
              color: mode === "light" ? "black" : "white",
              borderColor: mode === "light" ? "black" : "white",
            }}
          >
            <h3>{notes[0].title}</h3>
            <span
              className="divider"
              style={{ backgroundColor: mode === "light" ? "black" : "white" }}
            ></span>
            <p>{notes[0].text}</p>
          </div>
          <div className="buttons">
            <Link
              to="/notes"
              onClick={() => {
                deleteNote(clickedNoteId);
              }}
              className="button"
            >
              Delete
            </Link>
            <Link to="/notes/edit" className="button">
              Edit
            </Link>
          </div>
        </div>
      )}
      {!notes && <h3>No Note Available</h3>}
    </div>
  );
};

export default Note;
