/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import { Game } from "./gameClass";
import "./chess.css";
export class chess extends Game {
  clicked = false;
  moves = [];
  prevID = "";

  getMoves(state, piece, x, y) {
    if (piece == "♟B") {
      return this.pawnMovesB(state, x, y);
    }
    if (piece == "♙W") {
      return this.pawnMovesW(state, x, y);
    }
    if (piece == "♜B" || piece == "♖W") {
      return this.rookMoves(state, x, y);
    }
    if (piece == "♞B" || piece == "♘W") {
      return this.knightMoves(state, x, y);
    }
    if (piece == "♝B" || piece == "♗W") {
      return this.bishopMoves(state, x, y);
    }
    if (piece == "♛B" || piece == "♕W") {
      return this.queenMoves(state, x, y);
    }
    if (piece == "♚B" || piece == "♔W") {
      return this.kingMoves(state, x, y);
    }
  }
  pawnMovesB(state, x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x + 1 < 8) {
      const cell1 = document.getElementById(x + 1 + "" + y);
      if (cell1.innerText == "") {
        moves.push(x + 1 + "" + y);
        const cell4 = document.getElementById(x + 2 + "" + y);
        if (cell4.innerText == "" && x == 1) {
          moves.push(x + 2 + "" + y);
        }
      }
      if (y + 1 < 8) {
        const cell2 = document.getElementById(x + 1 + "" + (y + 1));
        if (cell2.innerText != "" && cell2.innerText.charAt(1) == "W") {
          moves.push(x + 1 + "" + (y + 1));
        }
      }
      if (y - 1 >= 0) {
        const cell3 = document.getElementById(x + 1 + "" + (y - 1));
        if (cell3.innerText != "" && cell3.innerText.charAt(1) == "W") {
          moves.push(x + 1 + "" + (y - 1));
        }
      }
    }
    return moves;
  }
  pawnMovesW(x, y) {
    const moves = [];
    x = parseInt(x);
    y = parseInt(y);
    if (x - 1 >= 0) {
      const cell1 = document.getElementById(x - 1 + "" + y);
      if (cell1.innerText == "") {
        moves.push(x - 1 + "" + y);
        const cell4 = document.getElementById(x - 2 + "" + y);
        if (cell4.innerText == "" && x == 6) {
          moves.push(x - 2 + "" + y);
        }
      }
      if (y + 1 < 8) {
        const cell2 = document.getElementById(x - 1 + "" + (y + 1));
        if (cell2.innerText != "" && cell2.innerText.charAt(1) == "B") {
          moves.push(x - 1 + "" + (y + 1));
        }
      }
      if (y - 1 >= 0) {
        const cell3 = document.getElementById(x - 1 + "" + (y - 1));
        if (cell3.innerText != "" && cell3.innerText.charAt(1) == "B") {
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
      const cell = document.getElementById(i + "" + y);
      if (cell.innerText == "") {
        moves.push(i + "" + y);
      } else {
        if (state.board[i][y].charAt(1) != state.board[x][y].charAt(1)) {
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
        if (state.board[i][y].charAt(1) != state.board[x][y].charAt(1)) {
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
        if (state.board[x][i].charAt(1) != state.board[x][y].charAt(1)) {
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
        if (state.board[x][i].charAt(1) != state.board[x][y].charAt(1)) {
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
      const cell = document.getElementById(x + 1 + "" + (y - 2));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 1 + "" + (y - 2));
      }
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      const cell = document.getElementById(x - 1 + "" + (y - 2));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 1 + "" + (y - 2));
      }
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      const cell = document.getElementById(x - 2 + "" + (y - 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 2 + "" + (y - 1));
      }
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      const cell = document.getElementById(x + 2 + "" + (y - 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 2 + "" + (y - 1));
      }
    }
    if (x + 2 < 8 && y + 1 < 8) {
      const cell = document.getElementById(x + 2 + "" + (y + 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 2 + "" + (y + 1));
      }
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      const cell = document.getElementById(x - 2 + "" + (y + 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 2 + "" + (y + 1));
      }
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      const cell = document.getElementById(x - 1 + "" + (y + 2));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 1 + "" + (y + 2));
      }
    }
    if (x + 1 < 8 && y + 2 < 8) {
      const cell = document.getElementById(x + 1 + "" + (y + 2));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
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
      const cell = document.getElementById(i + "" + j);
      if (cell.innerText == "") {
        moves.push(i + "" + j);
      } else {
        if (cell.innerText.charAt(1) != state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      const cell = document.getElementById(i + "" + j);
      if (cell.innerText == "") {
        moves.push(i + "" + j);
      } else {
        if (cell.innerText.charAt(1) != state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      const cell = document.getElementById(i + "" + j);
      if (cell.innerText == "") {
        moves.push(i + "" + j);
      } else {
        if (cell.innerText.charAt(1) != state.board[x][y].charAt(1)) {
          moves.push(i + "" + j);
        }
        break;
      }
    }
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      const cell = document.getElementById(i + "" + j);
      if (cell.innerText == "") {
        moves.push(i + "" + j);
      } else {
        if (cell.innerText.charAt(1) != state.board[x][y].charAt(1)) {
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
      const cell = document.getElementById(x + 1 + "" + y);
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 1 + "" + y);
      }
    }
    if (x - 1 >= 0) {
      const cell = document.getElementById(x - 1 + "" + y);
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 1 + "" + y);
      }
    }
    if (y + 1 < 8) {
      const cell = document.getElementById(x + "" + (y + 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + "" + (y + 1));
      }
    }
    if (y - 1 >= 0) {
      const cell = document.getElementById(x + "" + (y - 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + "" + (y - 1));
      }
    }
    if (x + 1 < 8 && y + 1 < 8) {
      const cell = document.getElementById(x + 1 + "" + (y + 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 1 + "" + (y + 1));
      }
    }
    if (x + 1 < 8 && y - 1 >= 0) {
      const cell = document.getElementById(x + 1 + "" + (y - 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x + 1 + "" + (y - 1));
      }
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      const cell = document.getElementById(x - 1 + "" + (y + 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 1 + "" + (y + 1));
      }
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      const cell = document.getElementById(x - 1 + "" + (y - 1));
      if (
        cell.innerText == "" ||
        cell.innerText.charAt(1) != state.board[x][y].charAt(1)
      ) {
        moves.push(x - 1 + "" + (y - 1));
      }
    }
    return moves;
  }
  validMove(state, x, y) {
    const piece = state.board[x][y];
    if (
      piece != "" &&
      ((piece.charAt(1) == "W" && state.xIsNext) ||
        (piece.charAt(1) == "B" && !state.xIsNext))
    ) {
      return true;
    }
    return false;
  }
  makeMove(state, x, y) {
    if (!this.clicked) {
      const board = state.board;
      const piece = board[x][y];
      this.clicked = true;
      this.moves = this.getMoves(piece, x, y);
      this.prevID = x + "" + y;
    } else {
      const prevCell = document.getElementById(this.prevID);
      const cell = document.getElementById(x + "" + y);
      cell.innerText = prevCell.innerText;
      prevCell.innerText = "";
      state.board[x][y] =
        state.board[this.prevID.charAt(0)][this.prevID.charAt(1)];
      this.clicked = false;
      this.moves = [];
      this.prevID = "";
      state.xIsNext = !state.xIsNext;
    }
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
    const xSrc = move.charAt(0);
    const ySrc = move.charAt(1);
    const newStates = {
      rows: 8,
      cols: 8,
      gameName: "queen",
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
    const piece = newStates.board[xSrc][ySrc];
    console.log(piece);
    console.log(newStates.xIsNext);
    if (!this.validMove(newStates, xSrc, ySrc)) {
      return [false, newStates];
    }
    const moves = this.getMoves(newStates, piece, xSrc, ySrc);
    const dest = prompt("Enter destination of the piece");
    const xDest = dest.charAt(0);
    const yDest = dest.charAt(1);
    console.log(moves);
    if (!moves.includes(xDest + "" + yDest)) {
      console.log("Invalid move");
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
}
// controller(state, move) {
//   if (!this.clicked) {
//     const board = this.state.board;
//     const id = move.target.id;
//     const x = move.target.id.charAt(0);
//     const y = move.target.id.charAt(1);
//     const piece = board[x][y];
//     if (
//       piece != "" &&
//       ((piece.charAt(1) == "W" && this.state.xIsNext) ||
//         (piece.charAt(1) == "B" && !this.state.xIsNext))
//     ) {
//       this.clicked = true;
//       this.moves = this.getMoves(piece, x, y);
//       this.prevID = id;
//     }
//   } else {
//     if (this.moves.includes(move.target.id)) {
//       const prevCell = document.getElementById(this.prevID);
//       const cell = document.getElementById(move.target.id);
//       cell.innerText = prevCell.innerText;
//       prevCell.innerText = "";
//       const board = this.state.board;
//       board[move.target.id.charAt(0)][move.target.id.charAt(1)] =
//         board[this.prevID.charAt(0)][this.prevID.charAt(1)];
//       board[this.prevID.charAt(0)][this.prevID.charAt(1)] = "";
//       state.board = board;
//       this.state.xIsNext = !this.state.xIsNext;
//       this.drawer(state);
//     }
//     this.clicked = false;
//     this.prevID = "";
//     this.moves = [];
//   }
// }
// drawer(state) {
//   if (state == null) {
//     return this.Init();
//   }
//   const cells = document.getElementsByClassName("cellchess");
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].innerText =
//       state.board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
//   }
// }
// Init() {
//   this.clicked = false;
//   const board = this.drawBoard(8, 8, "chess");
//   const board2 = [
//     ["♜B", "♞B", "♝B", "♛B", "♚B", "♝B", "♞B", "♜B"],
//     ["♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B", "♟B"],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["♙W", "♙W", "♙W", "♙W", "♙W", "♙W", "♙W", "♙W"],
//     ["♖W", "♘W", "♗W", "♕W", "♔W", "♗W", "♘W", "♖W"],
//   ];
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
//       <h1 style={{ textAlign: "center" }}> Chess</h1>
//       <div className="chessBoard">{clonedrows}</div>
//     </div>
//   );
// }

export default chess;
