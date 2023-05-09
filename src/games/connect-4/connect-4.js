import Game from "../gameClass";
import React from "react";
import "./connect-4.css";
export class Connect4 extends Game {
  controller(state, move) {
    console.log(move);
    const col = parseInt(move[0]) - 1;
    console.log(col);
    console.log(state);
    let NewState = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        NewState[i][j] = state.board[i][j];
      }
    }
    let row,
      valid = false,
      win = state.winner;
    for (let x = 5; x >= 0 && !valid && col < 7; x--) {
      if (NewState[x][col] === "") {
        row = x;
        valid = true;
      }
    }
    if (valid === false || win === true || move.length !== 1) {
      const newState = {
        board: NewState,
        xIsNext: state.xIsNext,
        winner: win,
      };
      return [false, newState];
    }
    NewState[row][col] = state.xIsNext ? "R" : "Y";
    let xIsNext = !state.xIsNext;
    const newState = {
      board: NewState,
      xIsNext: xIsNext,
      winner: win,
    };

    console.log(newState);
    console.log(state);
    if (this.checkWinner(newState, row, col)) {
      console.log(this.checkWinner(newState, row, col));
      newState.winner = this.checkWinner(newState, row, col);
      return [false, newState];
    }

    return [true, newState];
  }

  drawer(state) {
    const board = state.board;
    const cells = document.getElementsByClassName("cellconnect-4");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
      if (board[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === "R") {
        cells[i].style.backgroundColor = "Red";
      } else if (board[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === "Y") {
        cells[i].style.backgroundColor = "Yellow";
      }
    }
  }

  checkWinner(state, row, col) {
    const check = [-3, -2, -1, 0, 1, 2, 3];
    let board = state.board;
    if (state.winner === true) return true;
    let winner = false;
    // check pieces in the same row
    for (let i = 0; i < check.length - 3; i++) {
      let col_arr = [];
      let flag = false;
      for (let j = 0; j < 4; j++) {
        let col_check = col + check[i + j];
        col_arr.push(col_check);
        if (col_check < 0 || col_check > 6) {
          flag = true;
        }
      }
      if (!flag) {
        let curPiece = board[row][col];
        let count = 0;
        for (let r = 0; r < 4; r++) {
          if (board[row][col_arr[r]] === curPiece) {
            count++;
          }
        }
        if (curPiece !== "" && count === 4) {
          console.log(curPiece, "asd row winner");
          winner = true;
        }
      }
    }

    // check pieces in the same col
    for (let i = 0; i < check.length - 3; i++) {
      let row_arr = [];
      let flag = false;
      for (let j = 0; j < 4; j++) {
        let row_check = row + check[i + j];
        row_arr.push(row_check);
        if (row_check < 0 || row_check > 5) {
          flag = true;
        }
      }
      if (!flag) {
        let curPiece = board[row][col];
        let count = 0;
        for (let r = 0; r < 4; r++) {
          if (board[row_arr[r]][col] === curPiece) {
            count++;
          }
        }
        if (curPiece !== "" && count === 4) {
          console.log(curPiece, "as col winner");
          winner = true;
        }
      }
    }

    // check pieces in the same diagonal /
    for (let i = 0; i < check.length - 3; i++) {
      let row_arr = [];
      let col_arr = [];
      let flag = false;
      for (let j = 0; j < 4; j++) {
        let row_check = row + check[i + j];
        let col_check = col + -1 * check[i + j];
        row_arr.push(row_check);
        col_arr.push(col_check);
        if (row_check < 0 || row_check > 5 || col_check < 0 || col_check > 6) {
          flag = true;
        }
      }
      if (!flag) {
        let curPiece = board[row][col];
        let countL = 0;
        let countR = 0;
        for (let r = 0; r < 4; r++) {
          if (board[row_arr[r]][col_arr[r]] === curPiece) {
            countL++;
          }
          if (board[row_arr[r]][-1 * col_arr[r]] === curPiece) {
            countR++;
          }
        }
        if (curPiece !== "" && (countL === 4 || countR === 4)) {
          console.log(curPiece, "as diagonal / winner \\");
          winner = true;
        }
      }
    }
    // win
    for (let i = 0; i < check.length - 3; i++) {
      let row_arr = [];
      let col_arr = [];
      let flag = false;
      for (let j = 0; j < 4; j++) {
        let row_check = row + check[i + j];
        let col_check = col + -1 * check[i + j];
        row_arr.push(row_check);
        col_arr.push(col_check);
        if (row_check < 0 || row_check > 5 || col_check < 0 || col_check > 6) {
          flag = true;
        }
      }
      if (!flag) {
        let curPiece = board[row][col];
        let countL = 0;
        let countR = 0;
        for (let r = 0; r < 4; r++) {
          if (board[row_arr[r]][col_arr[r]] === curPiece) {
            countL++;
          }
          if (board[row_arr[r]][-1 * col_arr[r]] === curPiece) {
            countR++;
          }
        }
        if (curPiece !== "" && (countL === 4 || countR === 4)) {
          console.log(curPiece, "as diagonal / winner \\");
          winner = true;
        }
      }
    }
    if (winner === true) {
      return true;
    } else {
      return false;
    }
  }
  Init(gameState) {
    const intialBoard = gameState.board;
    const board = this.drawBoard(6, 7, "connect-4");
    const clonedrows = board.props.children.map((row) => {
      const clonedCells = row.props.children.map((cell) => {
        return React.cloneElement(cell, {
          children:
            intialBoard[parseInt(cell.props.id.charAt(0))][
              parseInt(cell.props.id.charAt(1))
            ],
        });
      });
      return React.cloneElement(row, {}, clonedCells);
    });
    return (
      <div>
        <h1 className="connect-4" style={{ textAlign: "center" }}>
          "connect-4"
        </h1>
        <div className={"connectboard"}>{clonedrows}</div>
      </div>
    );
  }
}
export default Connect4;
