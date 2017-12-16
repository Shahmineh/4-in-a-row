class Board {

  constructor(player1, player2) {
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
    this.player1.render('.my-turn',2);
    this.player2.render('.my-turn',2);
    this.round = 1;
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
      if (that.makeMove(col, that.currentPlayerNo)) {
        that.renderBoard();


        // Short hand If statement
        that.currentPlayerNo = that.currentPlayerNo == 1 ? 2 : 1;
        // if (that.currentPlayerNo == 1) {
        //   that.currentPlayerNo = 2;
        // } else {
        //   that.currentPlayerNo = 1;
        // }
        this.round++;
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






}
