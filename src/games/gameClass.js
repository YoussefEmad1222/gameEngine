import React from "react";

export class Game extends React.Component {
  drawAfterMove(state) {}
  validMove(state, row, col) {}
  makeMove(state, row, col) {}

  gameStart(state) {
    let gameMove = null;
    setTimeout(() => {
      while (!gameMove) {
        gameMove = prompt("Enter your move");
      }
      const valid = this.controller(state, gameMove)[0];
      state = this.controller(state, gameMove)[1];
      if (!valid) {
        alert("Invalid move");
      }
      this.drawer(state);
      this.gameStart(state);
    }, 3000);
    return this.Init(state);
  }

  drawer(state) {
    if (state == null) {
      return this.Init(state);
    } else {
      this.drawAfterMove(state);
    }
  }

  controller(state, move) {
    const row = parseInt(move.charAt(0));
    const col = parseInt(move.charAt(1));
    if (!this.validMove(state, row, col)) {
      return [false, state];
    }
    state = this.makeMove(state, row, col);
    return [true, state];
  }

  drawBoard(row, col, gameName) {
    let board = [];
    const gamename = gameName;
    const height = 500 / row;
    const width = 500 / col;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        row.push(
          <button
            className={"cell" + gamename}
            id={i + "" + j}
            style={{ height: height, width: width }}
          ></button>
        );
      }
      board.push(
        <div className={"row" + gamename} id={i}>
          {row}
        </div>
      );
    }
    return <div className="board">{board}</div>;
  }

  Init(gameState) {
    const rows = gameState.rows;
    const cols = gameState.cols;
    const gameName = gameState.gameName;
    const intialBoard = gameState.board;
    const board = this.drawBoard(rows, cols, gameName);
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
        <h1 className={gameName} style={{ textAlign: "center" }}>
          {gameName}
        </h1>
        <div className={gameName + "board"}>{clonedrows}</div>
      </div>
    );
  }
}
export default Game;
