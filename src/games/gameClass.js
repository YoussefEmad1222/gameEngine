import React from "react";

export class Game extends React.Component {
  constructor(rows, cols, gameName, intialBoard) {
    super();
    this.state = {
      board: intialBoard,
      rows: rows,
      cols: cols,
      gameName: gameName,
    };
  }

  drawAfterMove(state) {}
  validMove(state, row, col) {}
  makeMove(state, row, col) {}

  drawer(state) {
    if (state == null) {
      return this.Init(
        this.state.rows,
        this.state.cols,
        this.state.gameName,
        this.state.board
      );
    } else {
      this.drawAfterMove(state);
    }
  }

  controller(state, move) {
    const row = parseInt(move.target.id.charAt(0));
    const col = parseInt(move.target.id.charAt(1));
    if (!this.validMove(state, row, col)) {
      return;
    }
    this.makeMove(state, row, col);
    this.drawer(state);
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
        <h1 className={gameName} style={{ textAlign: "center" }}>
          {gameName}
        </h1>
        <div className={gameName + "board"}>{clonedrows}</div>
      </div>
    );
  }
}
export default Game;
