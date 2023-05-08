import Game from "./gameClass";
import "./Tictactoe.css";

export class TicTacToe extends Game {
  controller(state, move) {
    const newState = {
      rows: 3,
      cols: 3,
      gameName: "tic",
      board: ["", "", "", "", "", "", "", "", ""],
      xIsNext: state.xIsNext,
    };
    for (let i = 0; i < 9; i++) {
      newState[i] = state.board[i];
    }
    if (move.length !== 2) {
      return [false, newState];
    }
    const row = parseInt(move[0]);
    const col = parseInt(move[1]);
    const idx = row * 3 + col;
    if (idx < 0 || idx > 8 || newState[idx] !== "" || this.checkWinner(state)) {
      return [false, newState];
    }

    newState[idx] = state.xIsNext ? "X" : "O";
    newState.xIsNext = !state.xIsNext;
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
