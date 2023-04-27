import React from "react";
import { Game } from "./gameClass";
import "./chess.css";

export class Queen_8 extends Game {
  stack = [];
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }
  drawer(state) {
    if (state == null) {
      return this.Init();
    } else {
      const cells = document.getElementsByClassName("cellchess");

      for (let i = 0; i < cells.length; i++) {
        cells[i].innerText =
          state.board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
      }
    }
  }
  undo(state) {
    // if (this.stack.length > 0) {
    //   console.log("undo");
    //   console.log(this.stack);
    //   const board = this.stack.pop();
    //   console.log(board);
    //   state.board = board;
    //   console.log(state.board);
    //   console.log(this.stack);
    //   this.drawer(state);
    // }
  }
  controller(state, event) {
    const id = event.target.id;
    const x = parseInt(id[0]);
    const y = parseInt(id[1]);
    if (state.board[x][y] === "♛" || state.board[x][y] === "✘") {
      return;
    }
    if (state.board[x][y] === "") {
      const board = state.board;
      this.stack.push(board);
      board[x][y] = "♛";
      const moves = this.queenMove(x, y);
      for (let i = 0; i < moves.length; i++) {
        const row = parseInt(moves[i][0]);
        const col = parseInt(moves[i][1]);
        if (board[row][col] === "") {
          board[row][col] = "✘";
        }
      }
      state.board = board;
      this.drawer(state);
    }
  }
  Init() {
    const board = this.drawBoard(8, 8, "chess");
    const board2 = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
    this.stack = [];
    const clonedrows = board.props.children.map((row) => {
      const clonedCells = row.props.children.map((cell) => {
        return React.cloneElement(cell, {
          onClick: (event) => this.controller(this.state, event),
          children: board2[cell.props.id.charAt(0)][cell.props.id.charAt(1)],
        });
      });
      return React.cloneElement(row, {}, clonedCells);
    });
    this.state.board = board2;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          {" "}
          8Queens{" "}
          <button className="undoButton" onClick={() => this.undo(this.state)}>
            undo
          </button>
        </h1>
        <div className="chessBoard">{clonedrows}</div>
      </div>
    );
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