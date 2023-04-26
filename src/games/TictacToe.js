/* eslint-disable no-unused-vars */
import Game from "./gameClass";
import React from "react";
import { ScoreBoard } from "./ScoreBoard";
import "./Tictactoe.css";
export class TicTacToe extends Game {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(""),
      xIsNext: true,
      scores: {
        xScore: 0,
        oScore: 0,
      },
    };
  }
  drawer(state) {
    if (state == null) {
      return this.Init();
    }
    var XO = document.createElement("div");
    XO.className = this.state.xIsNext ? "X" : "O";
    XO.textContent = this.state.xIsNext ? "X" : "O";
    state.target.append(XO);
  }
  controller(state, move) {
    const row = parseInt(move.target.id.charAt(0));
    const col = parseInt(move.target.id.charAt(1));
    const idx = row * 3 + col;
    const winner = this.checkWinner(state);
    if (state.board[idx] !== "" || winner === true) {
      return;
    }
    state.board[idx] = this.state.xIsNext ? "X" : "O";
    this.drawer(move);
    state.xIsNext = !state.xIsNext;
    this.checkWinner(state);
    console.log(this.state);
  }

  Init() {
    console.log("init", this.state);
    const board = this.drawBoard(3, 3, "tic");
    const clonedrows = board.props.children.map((row) => {
      const clonedCells = row.props.children.map((cell) => {
        return React.cloneElement(cell, {
          onClick: (event) => this.controller(this.state, event),
        });
      });
      return React.cloneElement(row, {}, clonedCells);
    });
    console.log(clonedrows, "created");
    this.setState({ board: Array(9).fill(""), xIsNext: true });
    return (
      <div>
        <ScoreBoard scores={this.state.scores} xPlaying={this.state.xIsNext} />
        <div className="board">{clonedrows}</div>
      </div>
    );
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
        if (state.board[a] === "X") {
          state.scores.xScore++;
        } else {
          state.scores.oScore++;
        }
        this.setState({ scores: state.scores });
        this.Init();
        return true;
      }
    }
    return false;
  }
}
export default TicTacToe;
