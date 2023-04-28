import React from "react";
import { Game } from "./gameClass";
import "./chess.css";

export class Queen_8 extends Game {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  stack = [];
  undo() {
    console.log(this.stack);
    if (this.stack.length > 0) {
      const board = this.stack.pop();
      console.log(board);
      this.state.board = board;
      this.drawer(this.state);
    }
  }

  validMove(state, x, y) {
    if (state.board[x][y] === "♛" || state.board[x][y] === "✘") {
      return false;
    }
    return true;
  }
  makeMove(state, x, y) {
    const board = state.board;
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
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board2[i][j] = board[i][j];
      }
    }
    this.stack.push(board2);
    console.log(this.stack);
    console.log(board2);
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
  }

  drawAfterMove(state) {
    const board = state.board;
    const cells = document.getElementsByClassName("cellchess");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
    }
  }

  Init(rows, cols, gameName, intialBoard) {
    const board = this.drawBoard(rows, cols, gameName);
    const clonedrows = board.props.children.map((row) => {
      const clonedCells = row.props.children.map((cell) => {
        return React.cloneElement(cell, {
          onClick: (event) => this.controller(this.state, event),
          children:
            intialBoard[parseInt(cell.props.id.charAt(0))][
              parseInt(cell.props.id.charAt(1))
            ],
        });
      });
      return React.cloneElement(row, {}, clonedCells);
    });
    this.state.board = intialBoard;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          8Queens
          <button className="undoButton" onClick={this.undo.bind(this)}>
            UNDO
          </button>
        </h1>
        <div className={gameName + "board"}>{clonedrows}</div>
      </div>
    );
  }
  // controller(state, event) {
  //   const id = event.target.id;
  //   const x = parseInt(id[0]);
  //   const y = parseInt(id[1]);
  //   if (state.board[x][y] === "♛" || state.board[x][y] === "✘") {
  //     return;
  //   }
  //   if (state.board[x][y] === "") {
  //     const board = state.board;
  //     this.stack.push(board);
  //     board[x][y] = "♛";
  //     const moves = this.queenMove(x, y);
  //     for (let i = 0; i < moves.length; i++) {
  //       const row = parseInt(moves[i][0]);
  //       const col = parseInt(moves[i][1]);
  //       if (board[row][col] === "") {
  //         board[row][col] = "✘";
  //       }
  //     }
  //     state.board = board;
  //     this.drawer(state);
  //   }
  // }
  // Init() {
  //   const board = this.drawBoard(8, 8, "chess");
  //   const board2 = [
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //     ["", "", "", "", "", "", "", ""],
  //   ];
  //   this.stack = [];
  //   const clonedrows = board.props.children.map((row) => {
  //     const clonedCells = row.props.children.map((cell) => {
  //       return React.cloneElement(cell, {
  //         onClick: (event) => this.controller(this.state, event),
  //         children: board2[cell.props.id.charAt(0)][cell.props.id.charAt(1)],
  //       });
  //     });
  //     return React.cloneElement(row, {}, clonedCells);
  //   });
  //   this.state.board = board2;
  //   return (
  //     <div>
  //       <h1 style={{ textAlign: "center" }}>
  //         8Queens
  //         <button className="undoButton" onClick={() => this.undo(this.state)}>
  //           undo
  //         </button>
  //       </h1>
  //       <div className="chessBoard">{clonedrows}</div>
  //     </div>
  //   );
  // }
  // drawer(state) {
  //   if (state == null) {
  //     return this.Init();
  //   } else {
  //     const cells = document.getElementsByClassName("cellchess");

  //     for (let i = 0; i < cells.length; i++) {
  //       cells[i].innerText =
  //         state.board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
  //     }
  //   }
  // }
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
