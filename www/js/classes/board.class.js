class Board {

  constructor() {
    this.rows = 6;
    this.cols = 7;
    createBoard();

  }

createBoard() {
  let holder = $('.board');
  for (let i = 0; i < this.rows.length; i++) {
    let row = $('<div>').addClass('board-row');
    // for (let i = 0; i < this.cols.length; i++) {
    //   let col = $('<div>').addClass('board-col');
    // }
    // holder.append(row);
  }
  console.log(row);
  
}

}
