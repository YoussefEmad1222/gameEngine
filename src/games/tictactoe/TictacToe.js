import Game from "../gameClass";
import "./Tictactoe.css";
import React from "react";
export class TicTacToe extends Game {
  controller(state, move) {
    const newState = {
      board: ["", "", "", "", "", "", "", "", ""],
      xIsNext: state.xIsNext,
    };
    const row = move.charCodeAt(0) - "1".charCodeAt(0);
    const col = move.charCodeAt(1) - "1".charCodeAt(0);
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
  Init(gameState) {
    const intialBoard = gameState.board;
    const board = this.drawBoard(3, 3, "tic");
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
        <h1 className="tic" style={{ textAlign: "center" }}>
          X & O
        </h1>
        <div className={"ticboard"}>{clonedrows}</div>
      </div>
    );
  }
}
export default TicTacToe;
