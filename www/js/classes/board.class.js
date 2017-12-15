class Board {

  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.createBoard();

  }

createBoard() {
  const holder = $('.board');
  for (let i = 0; i < this.rows; i++) {
    let row = $('<div>').addClass('board-row');
    for (let j = 0; j < this.cols; j++) {
      let col = $('<div>').addClass('board-col empty');
      row.append(col); // Magic
    }
    holder.append(row);
  }
  console.log(holder.html());  
}

}