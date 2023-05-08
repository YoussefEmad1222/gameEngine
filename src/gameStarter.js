/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import TicTacToe from "./games/TictacToe";
import { chess } from "./games/chess";
import { Queen_8 } from "./games/queen";
import { Checkers } from "./games/checkers";
const getGame = (game) => {
  if (game === "tic") {
    const state = {
      rows: 3,
      cols: 3,
      gameName: "tic",
      board: ["", "", "", "", "", "", "", "", ""],
      xIsNext: true,
    };
    return [new TicTacToe(), state];
  } else if (game === "chess") {
    const state = {
      rows: 8,
      cols: 8,
      gameName: "chess",
      board: [
        ["♜B", "♞B", "♝B", "♛B", "♚B", "♝B", "♞B", "♜B"],
        ["♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙W", "♙W", "♙W", "♙W", "♙W", "♙W", "♙W", "♙W"],
        ["♖W", "♘W", "♗W", "♕W", "♔W", "♗W", "♘W", "♖W"],
      ],
      xIsNext: true,
    };
    return [new chess(), state];
  } else if (game === "queen") {
    const state = {
      rows: 8,
      cols: 8,
      gameName: "chess",
      board: [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ],
    };
    return [new Queen_8(), state];
  } else if (game === "checkers") {
    const state = {
      rows: 8,
      cols: 8,
      xIsNext: true,
      gameName: "checkers",
      board: [
        ["", "⚫", "", "⚫", "", "⚫", "", "⚫"],
        ["⚫", "", "⚫", "", "⚫", "", "⚫", ""],
        ["", "⚫", "", "⚫", "", "⚫", "", "⚫"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["⚪", "", "⚪", "", "⚪", "", "⚪", ""],
        ["", "⚪", "", "⚪", "", "⚪", "", "⚪"],
        ["⚪", "", "⚪", "", "⚪", "", "⚪", ""],
      ],
    };
    return [new Checkers(), state];
  }
};
const GameStarter = () => {
  const games = useParams();
  const game = getGame(games.id);
  const gameState = game[1];
  const gameClass = game[0];
  return gameClass.gameStart(gameState);
};

export default GameStarter;
