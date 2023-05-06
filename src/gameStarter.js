/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import TicTacToe from "./games/TictacToe";
import { chess } from "./games/chess";
import { Queen_8 } from "./games/queen";

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
    return new chess();
  } else if (game === "queen") {
    return new Queen_8();
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
