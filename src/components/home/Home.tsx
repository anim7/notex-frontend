import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

const { useState } = React;

interface Props {
  mode: "light" | "dark";
}

const Home: React.FC<Props> = ({ mode }) => {
  const [displayNotesAbout, setDisplatNotesAbout] = useState<boolean>(false);
  const [displayTodoAbout, setDisplayTodoAbout] = useState<boolean>(false);
  return (
    <>
      <div
        className="home-container"
        style={{
          color: mode === "light" ? "black" : "white",
          backgroundColor: mode === "light" ? "#d8dbb0" : "#13042c",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Save your Short Notes and make your To-Do List for today
        </h1>
        <div className="home-links">
          <Link to="/notes" className="app-link">
            Notes App
          </Link>
          <Link to="/todo" className="app-link">
            To-Do List App
          </Link>
        </div>
      </div>
      <div
        className="about"
        style={{
          borderColor: mode === "light" ? "black" : "white",
          backgroundColor: mode === "light" ? "skyblue" : "#062030",
          color: mode === "light" ? "black" : "white",
        }}
      >
        <h2>About</h2>
        <button
          style={{
            backgroundColor: mode === "light" ? "lightgreen" : "#19191a",
            color: mode === "light" ? "black" : "white",
            borderColor: mode === "light" ? "black" : "white",
          }}
          onClick={() => {
            setDisplatNotesAbout(!displayNotesAbout);
          }}
        >
          Notes App
        </button>
        <div
          className="about-text"
          style={{
            display: displayNotesAbout ? "block" : "none",
            backgroundColor: mode === "light" ? "lightgreen" : "#19191a",
            borderColor: mode === "light" ? "black" : "white",
          }}
        >
          Notes App is an app which saves your short notes for later use.
        </div>
        <button
          style={{
            backgroundColor: mode === "light" ? "lightgreen" : "#19191a",
            color: mode === "light" ? "black" : "white",
            borderColor: mode === "light" ? "black" : "white",
          }}
          onClick={() => {
            setDisplayTodoAbout(!displayTodoAbout);
          }}
        >
          To-Do List App
        </button>
        <div
          className="about-text"
          style={{
            display: displayTodoAbout ? "block" : "none",
            backgroundColor: mode === "light" ? "lightgreen" : "#19191a",
            borderColor: mode === "light" ? "black" : "white",
          }}
        >
          To-Do list App is an app which saves all the tasks you need to do
        </div>
      </div>
    </>
  );
};

export default Home;
