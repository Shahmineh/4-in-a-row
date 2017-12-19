
let highScore=new HighScore();

highScore.init().then(()=>{
    highScore.render('.highscore-table', highScore.highScoreList);
});