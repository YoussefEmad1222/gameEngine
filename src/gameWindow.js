/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./gameWindow.css";
const GameWindow = () => {
  return (
    <nav div className="menu">
      <input checked="checked" className="menu-toggler" type="checkbox"></input>
      <label htmlFor="menu-toggle"></label>
      <ul>
        <li className="menu-item">
          <Link to={`/game/${"tic"}`}>tictactoe</Link>
        </li>
        <li className="menu-item">
          <Link to={`/game/${"chess"}`}>chess</Link>
        </li>
        <li className="menu-item">
          <Link to={`/game/${"queen"}`}>8Queens</Link>
        </li>
        <li className="menu-item">
          <Link to={`/game/${"sudoku"}`}>sudoku</Link>
        </li>
        <li className="menu-item">
          <Link to={`/game/${"connect-4"}`}>connect4</Link>
        </li>
        <li className="menu-item">
          <Link to={`/game/${"checkers"}`}>checkers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GameWindow;
