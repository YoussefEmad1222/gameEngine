/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import { Game } from "../gameClass";
import "./chess.css";
import React from "react";
export class chess extends Game {
  getMoves(state, piece, x, y) {
    if (piece === "♟B") {
      return this.pawnMovesB(state, x, y);
    }
    if (piece === "♙W") {
      return this.pawnMovesW(state, x, y);
    }
    if (piece === "♜B" || piece === "♖W") {
      return this.rookMoves(state, x, y);
    }
    if (piece === "♞B" || piece === "♘W") {
      return this.knightMoves(state, x, y);
    }
    if (piece === "♝B" || piece === "♗W") {
      return this.bishopMoves(state, x, y);
    }
    if (piece === "♛B" || piece === "♕W") {
      return this.queenMoves(state, x, y);
    }
    if (piece === "♚B" || piece === "♔W") {
      return this.kingMoves(state, x, y);
    }
  }
  pawnMovesB(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x + 1 < 8) {
      const cell1 = state.board[x + 1][y];
      if (cell1 === "") {
        moves.push(x + 1 + "" + y);
        if (x + 2 < 8) {
          const cell4 = state.board[x + 2][y];
          if (cell4 === "" && x === 1) {
            moves.push(x + 2 + "" + y);
          }
        }
      }
      if (y + 1 < 8) {
        const cell2 = state.board[x + 1][y + 1];
        if (cell2 !== "" && cell2.charAt(1) === "W") {
          moves.push(x + 1 + "" + (y + 1));
        }
      }
      if (y - 1 >= 0) {
        const cell3 = state.board[x + 1][y - 1];
        if (cell3 !== "" && cell3.charAt(1) === "W") {
          moves.push(x + 1 + "" + (y - 1));
        }
      }
    }
    return moves;
  }
  pawnMovesW(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x - 1 >= 0) {
      const cell1 = state.board[x - 1][y];
      if (cell1 === "") {
        moves.push(x - 1 + "" + y);
        if (x - 2 >= 0) {
          const cell4 = state.board[x - 2][y];
          if (cell4 === "" && x === 6) {
            moves.push(x - 2 + "" + y);
          }
        }
      }
      if (y + 1 < 8) {
        const cell2 = state.board[x - 1][y + 1];
        if (cell2 !== "" && cell2.charAt(1) === "B") {
          moves.push(x - 1 + "" + (y + 1));
        }
      }
      if (y - 1 >= 0) {
        const cell3 = state.board[x - 1][y - 1];
        if (cell3 !== "" && cell3.charAt(1) === "B") {
          moves.push(x - 1 + "" + (y - 1));
        }
      }
    }
    return moves;
  }
  rookMoves(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    for (let i = x + 1; i < 8; i++) {
      const cell = state.board[i][y];
      if (cell === "") {
        moves.push(i + "" + y);
      } else {
        if (state.board[i][y].charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + y);
        }
        break;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      const cell = state.board[i][y];
      if (cell === "") {
        moves.push(i + "" + y);
      } else {
        if (state.board[i][y].charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + y);
        }
        break;
      }
    }
    for (let i = y + 1; i < 8; i++) {
      const cell = state.board[x][i];
      if (cell === "") {
        moves.push(x + "" + i);
      } else {
        if (state.board[x][i].charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(x + "" + i);
        }
        break;
      }
    }
    for (let i = y - 1; i >= 0; i--) {
      const cell = state.board[x][i];
      if (cell === "") {
        moves.push(x + "" + i);
      } else {
        if (state.board[x][i].charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(x + "" + i);
        }
        break;
      }
    }
    return moves;
  }
  knightMoves(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x + 1 < 8 && y - 2 >= 0) {
      const cell = state.board[x + 1][y - 2];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 1 + "" + (y - 2));
      }
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      const cell = state.board[x - 1][y - 2];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 1 + "" + (y - 2));
      }
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      const cell = state.board[x - 2][y - 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 2 + "" + (y - 1));
      }
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      const cell = state.board[x + 2][y - 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 2 + "" + (y - 1));
      }
    }
    if (x + 2 < 8 && y + 1 < 8) {
      const cell = state.board[x + 2][y + 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 2 + "" + (y + 1));
      }
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      const cell = state.board[x - 2][y + 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 2 + "" + (y + 1));
      }
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      const cell = state.board[x - 1][y + 2];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 1 + "" + (y + 2));
      }
    }
    if (x + 1 < 8 && y + 2 < 8) {
      const cell = state.board[x + 1][y + 2];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 1 + "" + (y + 2));
      }
    }
    return moves;
  }
  bishopMoves(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      const cell = state.board[i][j];
      if (cell === "") {
        moves.push(i + "" + j);
      } else {
        if (cell.charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      const cell = state.board[i][j];
      if (cell === "") {
        moves.push(i + "" + j);
      } else {
        if (cell.charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      const cell = state.board[i][j];
      if (cell === "") {
        moves.push(i + "" + j);
      } else {
        if (cell.charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      const cell = state.board[i][j];
      if (cell === "") {
        moves.push(i + "" + j);
      } else {
        if (cell.charAt(1) !== state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    return moves;
  }
  queenMoves(state, x, y) {
    const moves = [];
    moves.push(...this.rookMoves(state, x, y));
    moves.push(...this.bishopMoves(state, x, y));
    return moves;
  }
  kingMoves(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x + 1 < 8) {
      const cell = state.board[x + 1][y];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 1 + "" + y);
      }
    }
    if (x - 1 >= 0) {
      const cell = state.board[x - 1][y];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 1 + "" + y);
      }
    }
    if (y + 1 < 8) {
      const cell = state.board[x][y + 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + "" + (y + 1));
      }
    }
    if (y - 1 >= 0) {
      const cell = state.board[x][y - 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + "" + (y - 1));
      }
    }
    if (x + 1 < 8 && y + 1 < 8) {
      const cell = state.board[x + 1][y + 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 1 + "" + (y + 1));
      }
    }
    if (x + 1 < 8 && y - 1 >= 0) {
      const cell = state.board[x + 1][y - 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x + 1 + "" + (y - 1));
      }
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      const cell = state.board[x - 1][y + 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 1 + "" + (y + 1));
      }
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      const cell = state.board[x - 1][y - 1];
      if (cell === "" || cell.charAt(1) !== state.board[x][y].charAt(1)) {
        moves.push(x - 1 + "" + (y - 1));
      }
    }
    return moves;
  }
  validMove(state, x, y) {
    const piece = state.board[x][y];
    if (
      piece !== "" &&
      ((piece.charAt(1) === "W" && state.xIsNext) ||
        (piece.charAt(1) === "B" && !state.xIsNext))
    ) {
      return true;
    }
    return false;
  }

  drawer(state) {
    console.log("chess drawer");
    const board = state.board;
    const cells = document.getElementsByClassName("cellchess");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
    }
  }
  controller(state, move) {
    const newStates = {
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
      xIsNext: state.xIsNext,
    };
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        newStates.board[i][j] = state.board[i][j];
      }
    }
    if (move.length !== 2) {
      return [false, newStates];
    }
    var xSrc = move.charCodeAt(0) - "1".charCodeAt(0);
    var ySrc = move.charCodeAt(1) - "a".charCodeAt(0);
    xSrc = 8 - xSrc - 1;
    if (xSrc < 0 || xSrc > 7 || ySrc < 0 || ySrc > 7) {
      return [false, newStates];
    }
    const piece = newStates.board[xSrc][ySrc];
    console.log(piece);
    console.log(newStates.xIsNext);
    if (!this.validMove(newStates, xSrc, ySrc)) {
      return [false, newStates];
    }
    const moves = this.getMoves(newStates, piece, xSrc, ySrc);
    console.log(moves);
    const dest = prompt("Enter destination of the piece");
    var xDest = dest.charCodeAt(0) - "1".charCodeAt(0);
    var yDest = dest.charCodeAt(1) - "a".charCodeAt(0);
    xDest = 8 - xDest - 1;
    console.log(xDest + " " + yDest);
    if (dest.length !== 2) {
      return [false, newStates];
    }
    if (!moves.includes(xDest + "" + yDest)) {
      return [false, newStates];
    }
    console.log("Valid move");
    newStates.board[xDest][yDest] = newStates.board[xSrc][ySrc];
    newStates.board[xSrc][ySrc] = "";
    newStates.xIsNext = !newStates.xIsNext;
    console.log(newStates.board);
    console.log(newStates.xIsNext);

    return [true, newStates];
  }
  Init(gameState) {
    const intialBoard = gameState.board;
    const board = this.drawBoard(8, 8, "chess");
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
          chess
        </h1>
        <div className={"chessboard"}>{clonedrows}</div>
      </div>
    );
  }
}

export default chess;
