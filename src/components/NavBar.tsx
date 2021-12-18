import React from "react";
import "./styles/NavBar.css";
import { Link } from "react-router-dom";

interface Props {
  mode: "light" | "dark";
  toggleMode: () => void;
  setChecked: (checked: boolean) => void;
  checked: boolean;
}

const NavBar: React.FC<Props> = ({ mode, toggleMode, setChecked, checked }) => {
  return (
    <nav
      className="nav-container"
      style={{
        backgroundColor:
          mode === "light" ? "rgb(209, 204, 187)" : "rgb(26 26 26)",
        color: mode === "light" ? "black" : "white",
      }}
    >
      <ul
        className="left-container"
        style={{ color: mode === "light" ? "black" : "white" }}
      >
        <h1>
          <Link
            to="/"
            className="logo"
            style={{ color: mode === "light" ? "black" : "white" }}
          >
            NoTEX
          </Link>
        </h1>
        <button
          className="toggle-button"
          onClick={() => {
            const navLinks = document.getElementsByClassName("link");
            for (let i = 0; i < navLinks.length; i++) {
              navLinks[i].classList.toggle("active");
            }
          }}
          style={{
            backgroundColor:
              mode === "light" ? "rgb(209, 204, 187)" : "rgb(26, 26, 26)",
          }}
        >
          <span
            className="bar"
            style={{ backgroundColor: mode === "light" ? "black" : "white" }}
          ></span>
          <span
            className="bar"
            style={{ backgroundColor: mode === "light" ? "black" : "white" }}
          ></span>
          <span
            className="bar"
            style={{ backgroundColor: mode === "light" ? "black" : "white" }}
          ></span>
        </button>
        <li>
          <Link
            to="/"
            className="link"
            style={{ color: mode === "light" ? "black" : "white" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            style={{ color: mode === "light" ? "black" : "white" }}
            to="/notes"
            className="link"
          >
            Notes
          </Link>
        </li>
        <li>
          <Link
            to="/todo"
            className="link"
            style={{ color: mode === "light" ? "black" : "white" }}
          >
            To-Do List
          </Link>
        </li>
      </ul>
      <div className="right-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={checked}
            onClick={() => {
              if (checked) {
                setChecked(false);
              } else {
                setChecked(true);
              }
            }}
            onChange={toggleMode}
          />
          <span className="slider round"></span>
        </label>
        Dark Mode
      </div>
    </nav>
  );
};

export default NavBar;
