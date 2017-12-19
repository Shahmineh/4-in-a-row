class Board extends Base {

  constructor(player1, player2) {
    super();
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayerNo = 1;
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    this.renderBoard();
    this.setupHandler();
    this.player1.render('.my-turn', 2);
    this.move = 1;
    this.winnerAndScore = [];
  }


  renderBoard() {
    const holder = $('.board');
    holder.empty();
    for (let row = 0; row < this.board.length; row++) {
      let $row = $('<div>').addClass('board-row');
      for (let col = 0; col < this.board[row].length; col++) {
        let $col = $('<div>').addClass('board-col').attr('data-row', row).attr('data-col', col);
        if (this.board[row][col] == 0) {
          $col.addClass('empty')
        } else if (this.board[row][col] == 1) {
          $col.addClass('player1');
        } else {
          $col.addClass('player2');
        }
        $row.append($col);
      }
      holder.append($row);
    }

  } // /renderBoard

  setupHandler() {
    let that = this;
    // MouseEnter func
    $(document).on('mouseenter', '.empty', function () {
      let col = $(this).attr('data-col');
      $(this).addClass('player' + that.currentPlayerNo + '-hover');
    });

    $(document).on('mouseleave', '.board-col', function () {
      let col = $(this).attr('data-col');
      $(this).removeClass('player1-hover').removeClass('player2-hover');
    });

    $(document).on('click', '.board-col', function(){
      let col = $(this).attr('data-col');
      that.playColumn(col);
    });

  }

  playColumn(col){

    let row = this.getRowNow(col);
    if (this.currentPlayerNo == 2) {
     this.player1.render('.my-turn', 2);
    } else {
     this.player2.render('.my-turn', 2);
    }
    if (this.makeMove(col, this.currentPlayerNo)) {
      this.renderBoard();

      // there are problems of checkVictory(). The point of call this function here
      // is to finish the game, and do the rest tasks.
      if (!this.checkForWin(row, col)) {

       // Change player
       this.currentPlayerNo = this.currentPlayerNo == 1 ? 2 : 1;
       this.currentPlayer = this.currentPlayerNo == 1 ? this.player1 : this.player2;
       this.move++;

       // If the current player is a computer then ask it to make a move
       console.log("currentPlayer",this.currentPlayer)
       console.log("is a bot",this.currentPlayer instanceof Computer);
       if(this.currentPlayer instanceof Computer){
       	 this.currentPlayer.decideMove();
       }

      
     } else {
       $("#winner-modal").modal();
       $('#winner-name').html(this.getWinner(this.currentPlayerNo).name);
       let winnerScore = this.move;
       let winner = this.getWinner(this.currentPlayerNo);
       let winnerName = winner.name;
       let objWS = {
         name: winnerName,
         score: winnerScore,
         
       }
       
       JSON._load('winner_and_score').then((data) => {
        this.winnerAndScore = data.app;
        this.winnerAndScore.push(objWS);
        JSON._save('winner_and_score', { app: this.winnerAndScore });
      });
      
       

       // ?? really?
       $('.refresh-page').on('click', function () {
         location.reload();
       });

     } 
     return true;
   }
   else {
     return false;
   }
 }

 makeMove(col, playerNo) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] == 0) {
        this.board[row][col] = playerNo;
        return true;
      }
    }

  }

  getRowNow(col) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] == 0) {
        return row;
      }
    }
  }

  getWinner(PlayerNo) {
    if (PlayerNo == 2) {
      return this.player2;
    } else {
      return this.player1;
    }
  }

  checkForWin(row, col) {
    let counter1 = -1;
    let counter2 = 0;
    let counter3 = -1;
    let counter4 = -1;
    let that = this;

    //checks cols to right
    function checkColRight(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter1++
        col++
      }
      return counter1;
    }
    function checkColLeft(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter1++
        col--
      }
      return counter1;
    }
    //Checks the row up
    function checkRowUp(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter2++
        if (row == 5) {
          break
        } else {
          row++
        }
      }
    }
    //checks diagonals upper left to right
    function checkColUpperDiagonalLeft(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter3++
        if (row == 0) {
          break;
        } else {
          col--
          row--
        }
      }
      return counter3;
    }
    //checks diagonals upper right to left
    function checkColLowerDiagonalRight(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter3++
        if (row == 5) {
          break;
        } else {
        col++
        row++
        }
      }
      return counter3;
    }
    //checks diagonals upper left to right
    function checkColLowerDiagonalLeft(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter4++
        if (row == 0) {
          break;
        } else {
          col++
          row--
        }
      }
      return counter4;
    }
    //checks diagonals upper right to left
    function checkColUpperDiagonalRight(row, col) {
      while (that.board[row][col] == that.currentPlayerNo) {
        counter4++
        if (row == 5) {
          break;
        } else {
        col--
        row++
        }
      }
      return counter4;
    }
    checkColRight(row, col);
    checkColLeft(row, col);
    checkRowUp(row, col);
    checkColUpperDiagonalLeft(row, col);
    checkColLowerDiagonalRight(row, col);
    checkColLowerDiagonalLeft(row, col);
    checkColUpperDiagonalRight(row, col);

    if (counter1 >= 4 ||
        counter2 >= 4 ||
        counter3 >= 4 ||
        counter4 >= 4) {
      return true;
    }
  }

} // /class board
