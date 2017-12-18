
class HighScore extends Base {
    constructor() {
        super();
        this.highScoreList = [];
        return JSON._load('winner_and_score').then((data)=>{
            this.highScoreList=data.app;
        });
    }
}