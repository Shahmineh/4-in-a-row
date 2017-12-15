class Game extends Base {
    constructor() {
        super();
        this.board = new Board(this);
        this.player1 = null;
        this.player2 = null;
    }
    start() {
        //this.board = new Board();

    }

    click(element, instances) {
        if (element.hasClass('start-game')) {
            let p1Name = $('.p1-name').val();
            let p2Name = $('.p2-name').val();
            let p1AI = $('.p1-ai').is(':checked');
            let p2AI = $('.p2-ai').is(':checked');
            let p1Color = $('.p1-color')
        }
    }

}