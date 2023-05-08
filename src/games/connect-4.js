import Game from "./gameClass";
import React from "react";
import "./connect-4.css";
export class Connect4 extends Game {
  
  controller(state, move) {
    console.log(move);
    const col = parseInt(move[0]) - 1;
    console.log(col);
    console.log(state);
    let NewState = [["","","","","","",""],
                    ["","","","","","",""],
                    ["","","","","","",""],
                    ["","","","","","",""],
                    ["","","","","","",""],
                    ["","","","","","",""]];
    for(let i = 0 ; i < 6 ; i++){
        for(let j = 0 ; j < 7 ; j++){
            NewState[i][j] = state.board[i][j];
        }
    }
    let row , valid = false;
    for(let x = 5 ; x >= 0 && !valid && col < 7; x--){
        if(NewState[x][col] === ""){
            row = x;
            valid = true;
        } 
    }
    if(valid === false || state.winner === true){
        const newState = {
            rows: 6,
            cols: 7,
            gameName: "connect-4",
            board: NewState,
            xIsNext: state.xIsNext,
            winner: state.winner
        };
        return [false, newState];
    }
    NewState[row][col] = state.xIsNext ? "R" : "Y";
    let xIsNext = !state.xIsNext;
    const newState = {
        rows: 6,
        cols: 7,
        gameName: "connect-4",
        board: NewState,
        xIsNext: xIsNext,
        winner: state.winner
    };

    console.log(newState);
    console.log(state);
    if(this.checkWinner(newState,row,col)){
        console.log(this.checkWinner(newState,row,col))
        newState.winner = this.checkWinner(newState,row,col);
        return [false, newState];
    }

    return [true, newState];
  }

  drawer(state) {
    const board = state.board;
    const cells = document.getElementsByClassName("cellconnect-4");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = board[cells[i].id.charAt(0)][cells[i].id.charAt(1)];
      if(board[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === "R"){
        cells[i].style.backgroundColor = "Red"
      }else if (board[cells[i].id.charAt(0)][cells[i].id.charAt(1)] === "Y") {
        cells[i].style.backgroundColor = "Yellow"
      }
    }
  }
  
  checkWinner(state, row, col){
    const check = [-3,-2,-1,0,1,2,3]
    let board = state.board
    if(state.winner === true)
           return true;
    let winner = false;
    // check pieces in the same row
    for(let i = 0 ; i < check.length - 3; i++){
      let col_arr = [];
      let flag = false;
      for(let j = 0 ; j< 4 ;j++){
        let col_check = col + check[i+j];
        col_arr.push(col_check);
        if(col_check < 0 || col_check > 6 ){
            flag = true;
           }
      }    
      if(!flag){
        let curPiece = board[row][col];
        let count = 0;
        for(let r = 0; r < 4; r++){
          if(board[row][col_arr[r]] === curPiece){
            count++;
          }
        }
        if( curPiece !== "" && count === 4  ){
              console.log(curPiece,"asd row winner")
              winner = true;
        }
      }
 
 /*     let first = this.state.curCol + check[i]
      let second = this.state.curCol + check[i+1]
      let third = this.state.curCol + check[i+2]
      let fourth = this.state.curCol + check[i+3] 
      if( first < 0 || first > 6 ||
          second < 0 || second > 6 ||
          third < 0 || third > 6 ||
          fourth < 0 || fourth > 6 ){
          //console.log("aaaaaaaaaaaaaa row piece num in row" , this.state.curCol );
      }else{
        let curPiece = this.state.board[this.state.curRow][this.state.curCol];
        //console.log(curPiece, first , second , third , fourth,"curRow",this.state.curRow,"curCol",this.state.curCol)
        if( curPiece !== "" && board[this.state.curRow][first] === curPiece &&
            board[this.state.curRow][second] === curPiece &&
            board[this.state.curRow][third] === curPiece &&
            board[this.state.curRow][fourth] === curPiece ){
              console.log(curPiece,"asd row winner")
              winner = true;
        }
      }*/
    }

    // check pieces in the same col
    for(let i = 0 ; i < check.length - 3; i++){
      let row_arr = [];
      let flag = false;
      for(let j = 0 ; j< 4 ;j++){
        let row_check = row + check[i+j];
        row_arr.push(row_check);
        if(row_check < 0 || row_check > 5 ){
            flag = true;
           }
      }
      if(!flag){
        let curPiece = board[row][col];
        let count = 0;
        for(let r = 0; r < 4; r++){
          if(board[row_arr[r]][col] === curPiece){
            count++;
          }
        }
        if( curPiece !== "" &&  count === 4 ){
              console.log(curPiece,"as col winner")
              winner = true;
        }
      }

/*      let first = this.state.curRow + check[i]
      let second = this.state.curRow + check[i+1]
      let third = this.state.curRow + check[i+2]
      let fourth = this.state.curRow + check[i+3] 
      if( first < 0 || first > 5 ||
          second < 0 || second > 5 ||
          third < 0 || third > 5 ||
          fourth < 0 || fourth > 5 ){
          //console.log("aaaaaaaaaaaaaa col  piece num in col" , this.state.curRow );
      }else{
        let curPiece = this.state.board[this.state.curRow][this.state.curCol];
        //console.log(curPiece, first , second , third , fourth,"curRow",this.state.curRow,"curCol",this.state.curCol)
        if( curPiece !== "" && board[first][this.state.curCol] === curPiece &&
            board[second][this.state.curCol] === curPiece &&
            board[third][this.state.curCol] === curPiece &&
            board[fourth][this.state.curCol] === curPiece ){
              console.log(curPiece,"as col winner")
              winner = true;
        }
      }*/
    }

    // check pieces in the same diagonal \
    /*
    for(let i = 0 ; i < check.length - 3; i++){
      let firstR = this.state.curRow + check[i]
      let secondR = this.state.curRow + check[i+1]
      let thirdR = this.state.curRow + check[i+2]
      let fourthR = this.state.curRow + check[i+3] 
      let firstC = this.state.curCol + check[i]
      let secondC = this.state.curCol + check[i+1]
      let thirdC = this.state.curCol + check[i+2]
      let fourthC = this.state.curCol + check[i+3] 
      if((firstR < 0 || firstR > 5 ||
          secondR < 0 || secondR > 5 ||
          thirdR < 0 || thirdR > 5 ||
          fourthR < 0 || fourthR > 5)||
        ( firstC < 0 || firstC > 6 ||
          secondC < 0 || secondC > 6 ||
          thirdC < 0 || thirdC > 6 ||
          fourthC < 0 || fourthC > 6 )
           ){
          //console.log("aaaaaaaaaaaaaa diagonal  piece num in col" , this.state.curRow );
      }else{
        let curPiece = this.state.board[this.state.curRow][this.state.curCol];
           console.log(curPiece,
          "first index r " ,firstR ,
          "second index r " ,secondR ,
          "third index r " , thirdR ,
          "fourth index r " , fourthR,"\n",
          "first index C " ,firstC ,
          "second index C " ,secondC ,
          "third index C " , thirdC ,
          "fourth index C " , fourthC,"\n",
          "curRow",this.state.curRow,
          "curCol",this.state.curCol
          );
          if( curPiece !== "" && board[firstR][firstC] === curPiece &&
            board[secondR][secondC] === curPiece &&
            board[thirdR][thirdC] === curPiece &&
            board[fourthR][fourthC] === curPiece ){
              console.log(curPiece,"as diagonal winner \\")
              winner= true;
        }
      }
    }*/

    // check pieces in the same diagonal /
    for(let i = 0 ; i < check.length - 3; i++){
      let row_arr = [];
      let col_arr = [];
      let flag = false;
      for(let j = 0 ; j< 4 ;j++){
        let row_check = row + check[i+j]; 
        let col_check = col + -1*check[i+j];
        row_arr.push(row_check);
        col_arr.push(col_check);
        if(row_check < 0 || row_check > 5 || 
           col_check < 0 || col_check > 6 ){
            flag = true;
           }
      }    
      if(!flag){
        let curPiece = board[row][col];
        let countL = 0;
        let countR = 0;
        for(let r = 0; r < 4; r++){
          if(board[row_arr[r]][col_arr[r]] === curPiece){
            countL++;
          }
          if(board[row_arr[r]][-1*col_arr[r]] === curPiece){
            countR++;
          }
        }
        if( curPiece !== "" && ( countL === 4 || countR === 4 ) ){
              console.log(curPiece,"as diagonal / winner \\")
              winner = true;
        }
      }
    }
    // win
    for(let i = 0 ; i < check.length - 3; i++){
      let row_arr = [];
      let col_arr = [];
      let flag = false;
      for(let j = 0 ; j< 4 ;j++){
        let row_check = row + check[i+j]; 
        let col_check = col + -1*check[i+j];
        row_arr.push(row_check);
        col_arr.push(col_check);
        if(row_check < 0 || row_check > 5 || 
           col_check < 0 || col_check > 6 ){
            flag = true;
           }
      }    
      if(!flag){
        let curPiece = board[row][col];
        let countL = 0;
        let countR = 0;
        for(let r = 0; r < 4; r++){
          if(board[row_arr[r]][col_arr[r]] === curPiece){
            countL++;
          }
          if(board[row_arr[r]][-1*col_arr[r]] === curPiece){
            countR++;
          }
        }
        if( curPiece !== "" && ( countL === 4 || countR === 4 ) ){
              console.log(curPiece,"as diagonal / winner \\")
              winner = true;
        }
      }
    }
    if(winner=== true){
      return true;
    }else{
      return false;
    }
  }
}