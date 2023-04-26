import React from "react";

export class Game extends React.Component {
  drawer(state) {}
  controller(state, move) {}
  drawBoard(row, col, gameName) {
    let board = [];
    const gamename=gameName;
    const height = 500 / row;
    const width = 500 / col;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        row.push(
          <button
            className={"cell"+gamename}
            id={i + "" + j}
            style={{ height: height, width: width, border: "1px solid black" }}
          ></button>
        );
      }
      board.push(<div className={"row"+gamename} id={i}>{row}</div>);
    }
    return <div className="board">{board}</div>;
  }
  Init() {}
}

export default Game;
