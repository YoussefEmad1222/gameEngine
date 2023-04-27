/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import TicTacToe from "./games/TictacToe";
import { chess } from "./games/chess";
import { Queen_8 } from "./games/queen";

const getGame = (game) => {
  if (game === "tic") {
    return new TicTacToe();
  } else if (game === "chess") {
    return new chess();
  } else if (game === "queen") {
    return new Queen_8();
  }
};
const GameStarter = () => {
  const games = useParams();
  const game = getGame(games.id);
  return game.drawer();
};

export default GameStarter;
