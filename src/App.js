import React from "react";
import GameWindow from "./gameWindow";
import GameStarter from "./gameStarter";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameWindow />}></Route>
      <Route path="/game/:id" element={<GameStarter />}></Route>
    </Routes>
  );
}

export default App;
