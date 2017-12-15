class Board {

  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.renderBoard();
    this.setupHandler();
    this.board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ]
  }

  renderBoard() {
    const holder = $('.board');
    for (let i = 0; i < this.rows; i++) {
      let row = $('<div>').addClass('board-row');
      for (let j = 0; j < this.cols; j++) {
        let col = $('<div>').addClass('board-col empty').attr('data-row', i).attr('data-col', j);
        row.append(col);
      }
      holder.append(row);
    }
  }

  setupHandler() {
    // MouseEnter func
    $(document).on('mouseenter','.empty',function(){
      let col = $(this).attr('data-col');
      $(this).removeClass('empty').addClass('player1');
      console.log(col);
    });

    $(document).on('mouseleave','.player1',function(){
      let col = $(this).attr('data-col');
      $(this).removeClass('player1').addClass('empty');
      console.log(col);
    });
  }




}
