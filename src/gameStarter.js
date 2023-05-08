/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import TicTacToe from "./games/TictacToe";
import { chess } from "./games/chess";
import { Queen_8 } from "./games/queen";
import { Connect4 } from "./games/connect-4";
import { Sudoku } from "./games/sudoku";

const generateBoard = () => {
  
  const board = Array(9).fill().map(() => Array(9).fill(""));
  const generated = Array(9).fill().map(() => Array(9).fill(false));
  
  for (let i = 0; i < 9; i += 3) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let j = i; j < i + 3; j+=Math.ceil(Math.random() * 2)) {
      for (let k = i; k < i + 3; k+= Math.ceil(Math.random() * 2)) {
        const randomIndex = Math.floor(Math.random() * nums.length);
        const num = nums[randomIndex];
        board[j][k] = num;
        generated[j][k] = true;
        nums.splice(randomIndex, 1);
      }
    }
  }
  return [board, generated] ;
}


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
  }else if (game === "connect-4"){
    const state = {
      rows: 6,
      cols: 7,
      gameName: "connect-4",
      board: [["","","","","","",""],
              ["","","","","","",""],
              ["","","","","","",""],
              ["","","","","","",""],
              ["","","","","","",""],
              ["","","","","","",""]],
      xIsNext: true,
      winner : false
    };
    return [new Connect4(), state];
  }else if (game === "sudoku"){
    const init = generateBoard();
    const intialBoard = init[0];
    console.log(intialBoard)
    const unmod = init[1];
    console.log(unmod)
    const state = {
      rows: 9,
      cols: 9,
      gameName: "sudoku",
      board: intialBoard,
      selectedRow: null ,
      selectedCol: null ,
      curNumber : null,
      modify: [[false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false],
               [false,false,false,false,false,false,false,false,false]],
      unmodifyable : unmod
    };
    return [new Sudoku(), state];
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
