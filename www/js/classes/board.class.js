class Board {

  constructor() {
    this.board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,0,2]
    ];
    this.renderBoard();
    this.setupHandler();
  }

  renderBoard() {
    const holder = $('.board');
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
    // MouseEnter func
    $(document).on('mouseenter','.empty',function(){
      let col = $(this).attr('data-col');
      $(this).removeClass('empty').addClass('player1-hover');
    });

    $(document).on('mouseleave','.player1-hover',function(){
      let col = $(this).attr('data-col');
      $(this).removeClass('player1-hover').addClass('empty');
    });
  }




}
