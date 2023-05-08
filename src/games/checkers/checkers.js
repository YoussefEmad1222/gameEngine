import { Game } from "../gameClass";
import "./checkers.css";
export class Checkers extends Game {
  checkersMoves(state, piece, x, y) {
    const moves = [];
    if (piece === "⚫") {
      if (x < 7 && y < 7 && state.board[x + 1][y + 1] === "") {
        moves.push(x + 1 + "" + (y + 1));
      }
      if (x < 7 && y > 0 && state.board[x + 1][y - 1] === "") {
        moves.push(x + 1 + "" + (y - 1));
      }
      if (
        x < 6 &&
        y < 6 &&
        state.board[x + 1][y + 1] === "⚪" &&
        state.board[x + 2][y + 2] === ""
      ) {
        moves.push(x + 2 + "" + (y + 2));
      }
      if (
        x < 6 &&
        y > 1 &&
        state.board[x + 1][y - 1] === "⚪" &&
        state.board[x + 2][y - 2] === ""
      ) {
        moves.push(x + 2 + "" + (y - 2));
      }
    }
    if (piece === "⚪") {
      if (x > 0 && y < 7 && state.board[x - 1][y + 1] === "") {
        moves.push(x - 1 + "" + (y + 1));
      }
      if (x > 0 && y > 0 && state.board[x - 1][y - 1] === "") {
        moves.push(x - 1 + "" + (y - 1));
      }
      if (
        x > 1 &&
        y < 6 &&
        state.board[x - 1][y + 1] === "⚫" &&
        state.board[x - 2][y + 2] === ""
      ) {
        moves.push(x - 2 + "" + (y + 2));
      }
      if (
        x > 1 &&
        y > 1 &&
        state.board[x - 1][y - 1] === "⚫" &&
        state.board[x - 2][y - 2] === ""
      ) {
        moves.push(x - 2 + "" + (y - 2));
      }
    }
    return moves;
  }
  controller(state, move) {
    const newState = {
      rows: 8,
      cols: 8,
      xIsNext: state.xIsNext,
      gameName: "checkers",
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
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        newState.board[i][j] = state.board[i][j];
      }
    }
    if (move.length !== 2) {
      return [false, newState];
    }
    var x = move.charCodeAt(0) - "1".charCodeAt(0);
    var y = move.charCodeAt(1) - "1".charCodeAt(0);
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return [false, newState];
    }
    const piece = newState.board[x][y];
    if (
      (piece === "⚫" && newState.xIsNext) ||
      (piece === "⚪" && !newState.xIsNext) ||
      piece === ""
    ) {
      return [false, newState];
    }
    const moves = this.checkersMoves(newState, piece, x, y);
    console.log(moves);
    const dest = prompt("Enter destination");
    const destX = parseInt(dest.charAt(0));
    const destY = parseInt(dest.charAt(1));

    if (moves.includes(dest)) {
      if (piece === "⚫") {
        if (destX === x + 2 && destY === y + 2) {
          newState.board[x + 1][y + 1] = "";
        } else if (destX === x + 2 && destY === y - 2) {
          newState.board[x + 1][y - 1] = "";
        } else {
        }
      } else if (piece === "⚪") {
        if (destX === x - 2 && destY === y + 2) {
          newState.board[x - 1][y + 1] = "";
        } else if (destX === x - 2 && destY === y - 2) {
          newState.board[x - 1][y - 1] = "";
        }
      }
      newState.board[destX][destY] = piece;
      newState.board[x][y] = "";
      newState.xIsNext = !newState.xIsNext;
    } else {
      return [false, newState];
    }
    console.log(newState);
    console.log(newState.xIsNext);
    console.log(newState.board);
    return [true, newState];
  }
  drawer(state) {
    console.log(state.board);
    console.log("drawer");
    const board = state.board;
    const cells = document.getElementsByClassName("cellcheckers");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
    }
  }
}
export default Checkers;
