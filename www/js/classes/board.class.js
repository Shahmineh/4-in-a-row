class Board {

  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.createBoard();

    $(document).on('click mouseenter mouseleave','.slot',function(e){
      let me = $(this);
      let col = me.attr('data-col');
      console.log('You have ' + e.type + ' column', col);
    });

  }

  createBoard() {
    const holder = $('.board');
    for (let i = 0; i < this.rows; i++) {
      let row = $('<div>').addClass('board-row');
      for (let j = 0; j < this.cols; j++) {
        let col = $('<div class="slot">').addClass('board-col empty').attr('data-row', i).attr('data-col', j);
        row.append(col);
      }
      holder.append(row);
    }
  }

}
