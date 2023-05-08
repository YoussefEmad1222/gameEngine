import React from "react";

export class Game extends React.Component {
  drawer(state) {}

  controller(state, move) {}

  gameStart(state) {
    let gameMove = null;
    setTimeout(() => {
      while (!gameMove) {
        gameMove = prompt("Enter your move");
      }
      var valid = false;
      var newState = null;
      [valid, newState] = this.controller(state, gameMove);
      if (!valid) {
        alert("Invalid move");
      }
      this.drawer(newState);
      this.gameStart(newState);
    }, 1000);
    return this.Init(state);
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
