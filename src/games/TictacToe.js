/* eslint-disable no-unused-vars */
import Game from "./gameClass";
import React from "react";
import { ScoreBoard } from "./ScoreBoard";
import "./Tictactoe.css";
export class TicTacToe extends Game {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      cols: 3,
      gameName: "tic",
      board: ["", "", "", "", "", "", "", "", ""],
      xIsNext: true,
    };
  }
  validMove(state, row, col) {
    const idx = row * 3 + col;
    if (state.board[idx] !== "" || this.checkWinner(state)) {
      return false;
    }
    return true;
  }
  makeMove(state, row, col) {
    const idx = row * 3 + col;
    state.board[idx] = this.state.xIsNext ? "X" : "O";
    state.xIsNext = !state.xIsNext;
  }
  drawAfterMove(state) {
    const cells = document.getElementsByClassName("celltic");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = state.board[i];
    }
  }
  checkWinner(state) {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (
        state.board[a] &&
        state.board[a] === state.board[b] &&
        state.board[a] === state.board[c]
      ) {
        return true;
      }
    }
    return false;
  }
}
// Init(rows,col,gameName,intialBoard) {
//   const board = this.drawBoard(rows, col, gameName);
//   const clonedrows = board.props.children.map((row) => {
//     const clonedCells = row.props.children.map((cell) => {
//       return React.cloneElement(cell, {
//         onClick: (event) => this.controller(this.state, event),
//       });
//     });
//     return React.cloneElement(row, {}, clonedCells);
//   });

//   this.setState({ board: Array(9).fill(""), xIsNext: true });
//   return (
//     <div>
//       <div className={gameName + "board"}>{clonedrows}</div>
//     </div>
//   );
// }
// controller(state, move) {
//   const row = parseInt(move.target.id.charAt(0));
//   const col = parseInt(move.target.id.charAt(1));
//   const idx = row * 3 + col;
//   const winner = this.checkWinner(state);
//   if (state.board[idx] !== "" || winner === true) {
//     return;
//   }
//   state.board[idx] = this.state.xIsNext ? "X" : "O";
//   this.drawer(move);
//   state.xIsNext = !state.xIsNext;
// }
export default TicTacToe;
