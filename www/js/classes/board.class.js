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
    return JSON._load('winner_and_score').then((data) => {
        this.winnerAndScore = data.app;
    });
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


    // for (let i = 0; i < this.rows; i++) {
    //   let row = $('<div>').addClass('board-row');
    //   for (let j = 0; j < this.cols; j++) {
    //     let col = $('<div>').addClass('board-col empty').attr('data-row', i).attr('data-col', j);
    //     row.append(col);
    //   }
    //   holder.append(row);
    // }
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
      $(this).removeClass('player' + that.currentPlayerNo + '-hover');
    });

    $(document).on('click', '.board-col', function () {
      let col = $(this).attr('data-col');
      let row = that.getRowNow(col);
      if (that.makeMove(col, that.currentPlayerNo)) {
        that.renderBoard();

        // there are problems of checkVictory(). The point of call this function here
        // is to finish the game, and do the rest tasks.
        if (!that.checkVictory(col, row)) {

          // Short hand If statement
          that.currentPlayerNo = that.currentPlayerNo == 1 ? 2 : 1;
          // if (that.currentPlayerNo == 1) {
          //   that.currentPlayerNo = 2;
          // } else {
          //   that.currentPlayerNo = 1;
          // }
          if (that.currentPlayerNo == 2) {
            that.player1.render('.my-turn', 2);
          } else {
            that.player2.render('.my-turn', 2);
          }
          //console.log(that.move);
          that.move++;

        } else {
          $("#winner-modal").modal();
          $('#winner-name').html(that.getWinner(that.currentPlayerNo).name);
          let winnerScore = that.move;
          let winner = that.getWinner(that.currentPlayerNo);
          let winnerName = winner.name;
          let objWS={
            name:winnerName,
            point: winnerScore,
            ai: winner.ai,
            level: winner.difficulty
          }
          that.winnerAndScore.push(objWS);
          JSON._save('winner_and_score', {app:that.winnerAndScore});

        }





      }
    });

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

  //checkHorizontal 
  checkVictory(row, col) {

    let count = 1;
    let val = this.board[row][col];
    for (let i = row - 1; i >= 0; i--) {
      if (this.board[i][col] == val) count++;
      else break;
    }
    if (count >= 4) return true;
    else return false;
  }


  win() {

    //modal winning
    //render model
    //save game info into JSON
    //refresh page for game reset

  }








}
