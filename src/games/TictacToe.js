import Game from "./gameClass";
import "./Tictactoe.css";

export class TicTacToe extends Game {
  // validMove(state, row, col) {
  //   const idx = row * 3 + col;
  //   if (state.board[idx] !== "" || this.checkWinner(state)) {
  //     return false;
  //   }
  //   return true;
  // }

  // makeMove(state, row, col) {
  //   const idx = row * 3 + col;
  //   state.board[idx] = state.xIsNext ? "X" : "O";
  //   state.xIsNext = !state.xIsNext;
  //   return state;
  // }

  // drawAfterMove(state) {
  //   const cells = document.getElementsByClassName("celltic");
  //   for (let i = 0; i < cells.length; i++) {
  //     cells[i].innerText = state.board[i];
  //   }
  // }
  controller(state, move) {
    const row = parseInt(move[0]) - 1;
    const col = parseInt(move[1]) - 1;
    const idx = row * 3 + col;
    let NewState = Array(9).fill("");
    for (let i = 0; i < 9; i++) {
      NewState[i] = state.board[i];
    }
    if (NewState[idx] !== "" || this.checkWinner(state)) {
      const newState = {
        rows: 3,
        cols: 3,
        gameName: "tic",
        board: NewState,
        xIsNext: xIsNext,
      };
      return [false, newState];
    }

    NewState[idx] = state.xIsNext ? "X" : "O";
    let xIsNext = !state.xIsNext;
    const newState = {
      rows: 3,
      cols: 3,
      gameName: "tic",
      board: NewState,
      xIsNext: xIsNext,
    };
    console.log(newState);
    console.log(state);
    return [true, newState];
  }

  drawer(state) {
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
export default TicTacToe;
