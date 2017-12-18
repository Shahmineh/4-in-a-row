
let highScore=new HighScore();

highScore.init().then(()=>{
    highScore.render('.vs-human-content', highScore.vsHuman);
    highScore.render('.vs-easy-content', highScore.vsEasy);
    highScore.render('.vs-hard-content', highScore.vsHard);
});