//
import { Game } from "./gameClass";
import "./chess.css";

export class Queen_8 extends Game {
  controller(state, move) {
    const newState = {
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

    for (let i = 0; i < state.board.length; i++) {
      for (let j = 0; j < state.board.length; j++) {
        newState.board[i][j] = state.board[i][j];
      }
    }

    if (move === "delete") {
      console.log("delete");
      const gameMove = prompt("Enter the position of the queen to delete");
      var x = gameMove.charCodeAt(0) - "1".charCodeAt(0);
      var y = gameMove.charCodeAt(1) - "a".charCodeAt(0);
      x = 8 - x - 1;
      if (x < 0 || x > 7 || y < 0 || y > 7) {
        return [false, newState];
      }
      if (state.board[x][y] !== "♛") {
        return [false, newState];
      }
      newState.board[x][y] = "";
      const newBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
      ];

      for (let i = 0; i < newState.board.length; i++) {
        for (let j = 0; j < newState.board.length; j++) {
          if (newState.board[i][j] === "♛") {
            newBoard[i][j] = "♛";
            const moves = this.queenMove(i, j);
            for (let k = 0; k < moves.length; k++) {
              const row = parseInt(moves[k][0]);
              const col = parseInt(moves[k][1]);
              if (newBoard[row][col] === "") {
                newBoard[row][col] = "✘";
              }
            }
          }
        }
      }
      console.log(newBoard);
      newState.board = newBoard;
      console.log(newState);
      return [true, newState];
    }

    if (move.length !== 2) {
      return [false, newState];
    }
    var x = move.charCodeAt(0) - "1".charCodeAt(0);
    var y = move.charCodeAt(1) - "a".charCodeAt(0);
    x = 8 - x - 1;
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return [false, newState];
    }
    if (newState.board[x][y] === "♛" || newState.board[x][y] === "✘") {
      return [false, newState];
    }
    newState.board[x][y] = "♛";
    const moves = this.queenMove(x, y);
    for (let i = 0; i < moves.length; i++) {
      const row = parseInt(moves[i][0]);
      const col = parseInt(moves[i][1]);
      if (newState.board[row][col] === "") {
        newState.board[row][col] = "✘";
      }
    }
    return [true, newState];
  }

  drawer(state) {
    console.log(state.board);
    console.log("drawer");
    const board = state.board;
    const cells = document.getElementsByClassName("cellchess");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
    }
  }

  queenMove(x, y) {
    const moves = [];
    for (let i = 0; i < 8; i++) {
      if (!moves.includes(x + "" + i)) {
        moves.push(x + "" + i);
      }
      if (!moves.includes(i + "" + y)) {
        moves.push(i + "" + y);
      }
      if (x + i < 8 && y + i < 8 && !moves.includes(x + i + "" + y + i)) {
        moves.push(x + i + "" + (y + i));
      }
      if (x - i >= 0 && y - i >= 0 && !moves.includes(x - i + "" + y - i)) {
        moves.push(x - i + "" + (y - i));
      }
      if (x + i < 8 && y - i >= 0 && !moves.includes(x + i + "" + y - i)) {
        moves.push(x + i + "" + (y - i));
      }
      if (x - i >= 0 && y + i < 8 && !moves.includes(x - i + "" + y + i)) {
        moves.push(x - i + "" + (y + i));
      }
    }
    return moves;
  }
}
export default Queen_8;
