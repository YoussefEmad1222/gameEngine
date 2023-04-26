/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import { Game } from "./gameClass";
import React from "react";
import "./chess.css";
export class chess extends Game {
  clicked = false;
  constructor(props) {
    super(props);
    this.state = {
      board: Array(8).fill(Array(8).fill("")),
      xIsNext: true,
    };
  }
  controller(state, move) {
    if (!this.clicked) {
      //this.clicked = true;
      this.state = state;
      const board = this.state.board;
      const id = move.target.id;
      const x = id.charAt(0);
      const y = id.charAt(1);
      const piece = board[x][y];
      console.log(piece);
      const moves = this.getMoves(piece, x, y);
      console.log(moves);
      // if (piece != "") {
      //   const moves = this.getMoves(piece, x, y);
      //   console.log(moves);
      //   moves.forEach((element) => {
      //     const cell = document.getElementById(element);
      //     cell.style.backgroundColor = "green";
      //   });
      // }
    }
  }
  drawer(state) {
    if (state == null) {
      return this.Init();
    }
  }
  Init() {
    this.clicked = false;
    console.log("init", this.state);
    const board = this.drawBoard(8, 8, "chess");
    const board2 = [
      ["♜B", "♞B", "♝B", "♛B", "♚B", "♝B", "♞B", "♜B"],
      ["♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♟W", "♟W", "♟W", "♟W", "♟W", "♟W", "♟W", "♟W"],
      ["♜W", "♞W", "♝W", "♛W", "♚W", "♝W", "♞W", "♜W"],
    ];
    const clonedrows = board.props.children.map((row) => {
      const clonedCells = row.props.children.map((cell) => {
        return React.cloneElement(cell, {
          onClick: (event) => this.controller(this.state, event),
          children: board2[cell.props.id.charAt(0)][cell.props.id.charAt(1)],
        });
      });
      return React.cloneElement(row, {}, clonedCells);
    });
    console.log(clonedrows);

    console.log(board2);
    this.setState({ board: board2 });
    this.state.board = board2;
    console.log(this.state);
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> Chess</h1>
        <div className="chessBoard">{clonedrows}</div>
      </div>
    );
  }
  getMoves(piece, x, y) {
    if (piece == "♟B") {
      return this.pawnMovesB(x, y);
    }
    if (piece == "♟W") {
      return this.pawnMovesW(x, y);
    }
    if (piece == "♜B" || piece == "♜W") {
      return this.rookMoves(x, y);
    }
    if (piece == "♞B" || piece == "♞W") {
      return this.knightMoves(x, y);
    }
    if (piece == "♝B" || piece == "♝W") {
      return this.bishopMoves(x, y);
    }
    if (piece == "♛B" || piece == "♛W") {
      return this.queenMoves(x, y);
    }
    if (piece == "♚B" || piece == "♚W") {
      return this.kingMoves(x, y);
    }
  }
  pawnMovesB(x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x == 1) {
      x++;
      moves.push(x + "" + y);
      x++;
      moves.push(x + "" + y);
    } else {
      if (x + 1 < 8) {
        const cell1 = document.getElementById(x + "" + y);
        if (cell1.innerText == "") {
          moves.push(x + y);
        }
        const cell2 = document.getElementById(x + "" + (y + 1));
        if (cell2.innerText != "" && cell2.innerText.charAt(1) == "W") {
          moves.push(x + "" + (y + 1));
        }
        const cell3 = document.getElementById(x + "" + (y - 1));
        if (cell3.innerText != "" && cell3.innerText.charAt(1) == "W") {
          moves.push(x + "" + (y - 1));
        }
      }
    }
    return moves;
  }
  pawnMovesW(x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x == 6) {
      x--;
      moves.push(x + "" + y);
      x--;
      moves.push(x + "" + y);
    } else {
      if (x - 1 >= 0) {
        const cell1 = document.getElementById(x + "" + y);
        if (cell1.innerText == "") {
          moves.push(x + y);
        }
        const cell2 = document.getElementById(x + "" + (y + 1));
        if (cell2.innerText != "" && cell2.innerText.charAt(1) == "B") {
          moves.push(x + "" + (y + 1));
        }
        const cell3 = document.getElementById(x + "" + (y - 1));
        if (cell3.innerText != "" && cell3.innerText.charAt(1) == "B") {
          moves.push(x + "" + (y - 1));
        }
      }
    }
    return moves;
  }
  rookMoves(x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    for (let i = x + 1; i < 8; i++) {
      const cell = document.getElementById(i + "" + y);
      if (cell.innerText == "") {
        moves.push(i + "" + y);
      } else {
        if (
          this.state.board[i][y].charAt(1) != this.state.board[x][y].charAt(1)
        ) {
          moves.push(i + "" + y);
        }
        break;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      const cell = document.getElementById(i + "" + y);
      if (cell.innerText == "") {
        moves.push(i + "" + y);
      } else {
        if (
          this.state.board[i][y].charAt(1) != this.state.board[x][y].charAt(1)
        ) {
          moves.push(i + "" + y);
        }
        break;
      }
    }
    for (let i = y + 1; i < 8; i++) {
      const cell = document.getElementById(x + "" + i);
      if (cell.innerText == "") {
        moves.push(x + "" + i);
      } else {
        if (
          this.state.board[x][i].charAt(1) != this.state.board[x][y].charAt(1)
        ) {
          moves.push(x + "" + i);
        }
        break;
      }
    }
    for (let i = y - 1; i >= 0; i--) {
      const cell = document.getElementById(x + "" + i);
      if (cell.innerText == "") {
        moves.push(x + "" + i);
      } else {
        if (
          this.state.board[x][i].charAt(1) != this.state.board[x][y].charAt(1)
        ) {
          moves.push(x + "" + i);
        }
        break;
      }
    }
    return moves;
  }
}
