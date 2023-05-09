import Game from "../gameClass";
import React from "react";

import "./sudoku.css";
export class Sudoku extends Game {
  drawer(state) {
    const board = state.board;
    const cells = document.getElementsByClassName("cellsudoku");
    console.log("sad", state.modify, "adsadsad", state.board);
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
      console.log(
        "text",
        board[cells[i].id.charAt(0)][cells[i].id.charAt(1)],
        "id",
        cells[i].id
      );
      if (state.modify[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === true) {
        cells[i].style.backgroundColor = "Red";
      } else if (
        state.unmodifyable[cells[i].id.charAt(0)][cells[i].id.charAt(1)] ===
        true
      ) {
        cells[i].style.backgroundColor = "Yellow";
      } else {
        cells[i].style.backgroundColor = "White";
      }
    }
  }
  controller(state, move) {
    // valid move:  1a 1 : 9f 9 where (1) is the row,
    // (a) is the column and (9) is the input to the box
    // clear move: 1a 0
    const row = parseInt(move[0]) - 1;
    const col = move.charCodeAt(1) - 97;
    const input = parseInt(move[3]);
    console.log("heeereee", move, row, col, input);
    let NewState = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    let NewModify = Array(9)
      .fill()
      .map(() => Array(9).fill(false));
    let NewUnmodify = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        NewState[i][j] = state.board[i][j];
        NewModify[i][j] = state.modify[i][j];
        NewUnmodify[i][j] = state.unmodifyable[i][j];
      }
    }
    if (
      row > 9 ||
      col > 9 ||
      row < 0 ||
      col < 0 ||
      input < 0 ||
      input > 9 ||
      move.length < 4
    ) {
      const newState = {
        board: NewState,
        modify: NewModify,
        unmodifyable: NewUnmodify,
      };
      return [false, newState];
    }
    let valid = true;
    if (
      NewState[row][col] === "" ||
      NewState[row][col] === null ||
      NewModify[row][col] === true ||
      input === 0
    ) {
      console.log(row, col);
      NewModify[row][col] = false;
    } else {
      valid = false;
    }
    if (!valid) {
      const newState = {
        board: NewState,
        modify: NewModify,
        unmodifyable: NewUnmodify,
      };
      return [false, newState];
    }

    if (input === 0 && !NewUnmodify[row][col]) {
      NewState[row][col] = "";
      NewModify[row][col] = false;
    } else if (!NewUnmodify[row][col]) {
      NewState[row][col] = input;
    } else if (input === 0 && NewUnmodify[row][col]) {
      const newState = {
        board: NewState,
        modify: NewModify,
        unmodifyable: NewUnmodify,
      };
      return [false, newState];
    }

    console.log("make move", row, col, input, NewState, "newm", NewModify);

    // check for the row
    for (let i = 0; i < 9; i++) {
      console.log("saad", NewState[row][i], "aloo", NewState[row][col]);
      if (
        NewState[row][i] === NewState[row][col] &&
        NewState[row][col] !== "" &&
        i !== col
      ) {
        NewModify[row][col] = true;
      }
    }

    // check for the col
    for (let i = 0; i < 9; i++) {
      if (
        NewState[i][col] === NewState[row][col] &&
        NewState[row][col] !== "" &&
        i !== row
      ) {
        NewModify[row][col] = true;
      }
    }
    // check for the square
    let checkRow = Math.floor(row / 3) * 3;
    let checkCol = Math.floor(col / 3) * 3;

    for (let i = checkRow; i < checkRow + 3; i++) {
      for (let j = checkCol; j < checkCol + 3; j++) {
        if (
          NewState[i][j] === NewState[row][col] &&
          NewState[row][col] !== "" &&
          i !== row &&
          j !== col
        ) {
          NewModify[row][col] = true;
        }
      }
    }
    const newState = {
      board: NewState,
      modify: NewModify,
      unmodifyable: NewUnmodify,
    };
    return [true, newState];
  }
  Init(gameState) {
    const intialBoard = gameState.board;
    const board = this.drawBoard(9, 9, "sudoku");
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
        <h1 className="sudoku" style={{ textAlign: "center" }}>
          "sudoku"
        </h1>
        <div className={"sudokuboard"}>{clonedrows}</div>
      </div>
    );
  }
}

export default Sudoku;
