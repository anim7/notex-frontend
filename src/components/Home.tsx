import React from "react";
import "./styles/Home.css";

interface Props {
  mode: "light" | "dark";
}

const Home: React.FC<Props> = ({ mode }) => {
  return <div className="home-container"></div>;
};

export default Home;
