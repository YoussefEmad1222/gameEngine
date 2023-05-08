import Game from "./gameClass";
import React from "react";

import "./Tictactoe.css";
import "./sudoku.css";
export class Sudoku extends Game {
    
    drawer(state) {
      const board = state.board;
      const cells = document.getElementsByClassName("cellsudoku");
      console.log("sad",state.modify,"adsadsad",state.board); 
      for (let i = 0; i < cells.length; i++) {
          cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)]; 
          console.log("text",board[cells[i].id.charAt(0)][cells[i].id.charAt(1)] ,"id",cells[i].id )
          if(state.modify[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === true){
              cells[i].style.backgroundColor = "Red"
          }else if(state.unmodifyable[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === true){
              cells[i].style.backgroundColor ="Yellow"
          }else{
              cells[i].style.backgroundColor ="White"
          }
      }
    }
  
  controller(state, move) {
    // valid move:  1a 1 : 9f 9 where (1) is the row,  
    // (a) is the column and (9) is the input to the box
    // clear move: 1a 0
    const row = parseInt(move[0]) - 1;
    const col = move.charCodeAt(1) - 97;
    const input = parseInt(move[3]);
    
    console.log( "heeereee", move , row , col , input )
    let NewState = Array(9).fill().map(() => Array(9).fill(""));
    let NewModify = Array(9).fill().map(() => Array(9).fill(false));
    let NewUnmodify =Array(9).fill().map(() => Array(9).fill(""));
    for(let i = 0 ; i < 9 ; i++){
        for(let j = 0 ; j < 9 ; j++){
            NewState[i][j] = state.board[i][j];
            NewModify[i][j] = state.modify[i][j];
            NewUnmodify[i][j] = state.unmodifyable[i][j];
        }
    }
    if(row > 9 || col > 9 ||
        row < 0 || col < 0 ||
         input < 0 || input > 9 || move.length < 4){
        const newState = {
            rows: 9,
            cols: 9,
            gameName: "sudoku",
            board: NewState,
            modify: NewModify,
            unmodifyable: NewUnmodify
        };
        return [false, newState];
    }
    let valid = true;
    if(NewState[row][col] === "" || NewState[row][col] === null || NewModify[row][col] === true || input === 0){
        console.log(row , col)
        NewModify[row][col] = false;
    }else{
        valid = false;
    }
    if(!valid){
        const newState = {
            rows: 9,
            cols: 9,
            gameName: "sudoku",
            board: NewState,
            modify: NewModify,
            unmodifyable: NewUnmodify
        };
        return [false, newState];
    }
    
    if(input === 0 && !NewUnmodify[row][col]){
        NewState[row][col] = "";
        NewModify[row][col] = false;
    }else{
        NewState[row][col] = input;
    }
    
    console.log("make move",row , col, input , NewState, "newm",NewModify)
    
    // check for the row
    for(let i = 0 ; i < 9 ; i++){
        console.log("saad", NewState[row][i], "aloo",NewState[row][col])
      if(NewState[row][i] === NewState[row][col] 
          && (NewState[row][col] !== "") 
           && i !== col){
        NewModify[row][col] = true;
      }
    }
    
    // check for the col
    for(let i = 0 ; i < 9 ; i++){
        if(NewState[i][col] === NewState[row][col] 
            &&  NewState[row][col] !== ""
             && i !== row){
          NewModify[row][col] = true;
        }
    }
    // check for the square
    let checkRow = Math.floor(row/3)*3;
    let checkCol = Math.floor(col/3)*3;

    for(let i = checkRow ; i < checkRow + 3 ; i++){  
        for(let j = checkCol ; j < checkCol + 3 ; j++){
            if(NewState[i][j] === NewState[row][col]
              && NewState[row][col] !== ""
              && i !== row
              && j !== col ){
              NewModify[row][col] = true;
            }
        }
    }
    const newState ={
        rows: 9,
        cols: 9,
        gameName: "sudoku",
        board: NewState,
        modify: NewModify,
        unmodifyable: NewUnmodify
    }
    return [true, newState];  
  }


  
  
  makeMove(state, row, col) {  
    state.board[state.selectedRow][state.selectedCol] = state.curNumber 
    console.log("make move",row , col, state.curNumber , state.board)
    for(let i = 0 ; i < 9 ; i++){
        console.log("saad", state.board[state.selectedRow][i], "aloo",state.board[state.selectedRow][state.selectedCol])
      if(state.board[state.selectedRow][i] === state.board[state.selectedRow][state.selectedCol] 
          && state.board[state.selectedRow][state.selectedCol] !== null 
           && i !== state.selectedCol){
        state.modify[state.selectedRow][state.selectedCol] = true;
        }
    }
    for(let i = 0 ; i < 9 ; i++){
        if(state.board[i][state.selectedCol] === state.board[state.selectedRow][state.selectedCol] 
          &&  state.board[state.selectedRow][state.selectedCol] !== null
           && i !== state.selectedRow){
        state.modify[state.selectedRow][state.selectedCol] = true;
      }
    }
    let checkRow = Math.floor(state.selectedRow/3)*3;
    let checkCol = Math.floor(state.selectedCol/3)*3;

    for(let i = checkRow ; i < checkRow + 3 ; i++){  
      for(let j = checkCol ; j < checkCol + 3 ; j++){
          if(state.board[i][j] === state.board[state.selectedRow][state.selectedCol]
            &&  state.board[state.selectedRow][state.selectedCol] !== null
            && i !== state.selectedRow
            && j !== state.selectedCol){
                state.modify[state.selectedRow][state.selectedCol] = true;
          }
      }
    }
    this.state.curNumber = null;
  }

  checkWinner(state){
      
  }
  
  
  
  /*validMove(state, row, col) {
      let board = state.board
      if(board[row][col] === "" || board[row][col] === null || state.curNumber === null){
          state.selectedRow = row;
          state.selectedCol = col;
          console.log(row , col, state.curNumber)
          state.modify[state.selectedRow][state.selectedCol] = false
        }else{
            return false ; 
        }
        return true;
    }
    /*constructor(props) {
      super(props);
      this.state = {
        rows: 9,
        cols: 9,
        gameName: "sudoku",
        board: [["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""],
                ["","","","","","","","",""]],
        selectedRow: null ,
        selectedCol: null ,
        curNumber : null,
        modify: [[false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,false,false,false]],
      };
    }*/
    /*drawer(state) {
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
    }*/
    
    /*controller(state, move) {
      const row = parseInt(move.target.id.charAt(0));
      const col = parseInt(move.target.id.charAt(1));
      if (!this.validMove(state, row, col)) {
        return;
      }
      this.makeMove(state, row, col);
      this.drawer(state);
    }*/
  /* drawNumbers(row, col, gameName){
    
    const numberButtons = Array.from({ length: SIZE }, (_, index) => (
      <button
        key={index + 1}
        className={`number-button ${index + 1 === +board[selectedRow][selectedCol] ? "selected" : ""}`}
        onClick={() => this.handleNumberClick(index + 1)}
      >
        {index + 1}
      </button>
    ));
  }*/

}
