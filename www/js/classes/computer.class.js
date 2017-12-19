class Computer extends Player{
    constructor(config){
        super(config);
    }

    decideMove(){
        const that = this;
        setTimeout(() => { 
            let col;
            do {
              col = Math.floor(Math.random() * 7);
            }
            while(!that.board.playColumn(col));
        }, 1500);
    }

}