class Game extends Base {
    constructor(board, player1, player2) {
        super();
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
       	this.player1.board = board;
       	this.player2.board = board;

       	// If player1 is a Computer then
       	// ask it to make a move
       	if(this.player1 instanceof Computer){
       	  this.player1.decideMove();
       	}
    }
}