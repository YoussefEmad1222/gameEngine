import Game from "../gameClass";
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
    const row = parseInt(move[0]) - 1;
    const col = parseInt(move[1]) - 1;
    const idx = row * 3 + col;
    for (let i = 0; i < newState.board.length; i++) {
      newState.board[i] = state.board[i];
    }
    if (move.length !== 2) {
      return [false, state];
    }
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return [false, state];
    }

    if (newState.board[idx] !== "") {
      return [false, newState];
    }

    newState.board[idx] = state.xIsNext ? "X" : "O";
    newState.xIsNext = !newState.xIsNext;
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
}
export default TicTacToe;
