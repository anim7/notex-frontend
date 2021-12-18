import React from "react";
import "./styles/Notes.css";
import { Link } from "react-router-dom";

const { useState, useEffect } = React;

interface Note {
  id: number;
  title: string;
  text: string;
}

interface Props {
  mode: "light" | "dark";
  notes: Note[] | null | undefined;
  fetchNotes: (id?: number) => void;
  setClickedNoteId: (id: number) => void;
}

const Notes: React.FC<Props> = ({
  mode,
  notes,
  fetchNotes,
  setClickedNoteId,
}) => {
  const [constructorHasBeenCalled, setConstructorHasBeenCalled] =
    useState<boolean>(false);

  useEffect(() => {
    fetchNotes();
    //eslint-disable-next-line
  }, []);

  const constructor = () => {
    if (!constructorHasBeenCalled) {
      fetchNotes();
      setConstructorHasBeenCalled(true);
    }
  };

  constructor();

  return (
    <div
      className="notes-container"
      style={{ color: mode === "light" ? "black" : "white" }}
    >
      <h1>Your Notes</h1>
      <Link to="create" className="btn">
        Create New
      </Link>
      <Link to="/notes" className="btn">
        Delete All
      </Link>
      {notes && (
        <div className="notes">
          {notes.map((note) => {
            return (
              <Link
                to={`${note.id}`}
                key={note.id}
                className="note"
                style={{
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" ? "lightgreen" : "#142825",
                  borderColor: mode === "light" ? "black" : "white",
                }}
                onClick={() => {
                  setClickedNoteId(note.id);
                  fetchNotes(note.id);
                }}
              >
                <div>
                  <h3>{note.title}</h3>
                  <hr />
                  <p>{note.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {notes === null && (
        <div>
          <h1>No Notes are availbale</h1>
        </div>
      )}
    </div>
  );
};

export default Notes;
