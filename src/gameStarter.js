/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";

import TicTacToe from "./games/TictacToe";
import { chess } from "./games/chess";
const getGame = (game) => {
  if (game === "tic") {
    return new TicTacToe();
  } else if (game === "chess") {
    return new chess();
  }
};
const GameStarter = () => {
  const games = useParams();
  const game = getGame(games.id);

  // eslint-disable-next-line no-unused-vars

  return game.drawer();
};

export default GameStarter;
