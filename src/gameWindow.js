/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./gameWindow.css";
const GameWindow = () => {
  return (
    <div className="gameWindow">
      <h1>choose your game you want to play</h1>
      <Link to={`/game/${"tic"}`}>
        <button>tictactoe</button>
      </Link>
      <Link to={`/game/${"chess"}`}>
        <button>Chess</button>
      </Link>
      <Link to={`/game/${"queen"}`}>
        <button>8Queens</button>
      </Link>
      <Link to={`/game/${"tic"}`}>
        <button>tictactoe</button>
      </Link>
      <Link to={`/game/${"tic"}`}>
        <button>tictactoe</button>
      </Link>
      <Link to={`/game/${"tic"}`}>
        <button>tictactoe</button>
      </Link>
    </div>
  );
};

export default GameWindow;
