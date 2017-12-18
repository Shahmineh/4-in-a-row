

let game;
let board;
let player1;
let player2;

$('.spela-btn').on('click', function () {
  player1 = new Player({ name: "player 1", color: "red", ai: false, difficulty: null, playerNo: 1, playerEl: '.p1-info' });
  player2 = new Player({ name: "player 2", color: "yellow", ai: false, difficulty: null, playerNo: 2, playerEl: '.p2-info' });
  player1.render('.p1-info');
  player2.render('.p2-info');
});
$('.start-game').on('click', function () {
  
  board = new Board(player1, player2);
  game = new Game(board, player1, player2);
  //game.start();   
  //If we still have time. Set up game start in main.js, and move board, player render to Game. Move the code and make the process more logical.
  $('.spela-btn').hide();
  $('.board').removeClass('d-flex');
});







// JSON._classes(Game, Board, Player);





// Scaling function so the board fits the browser widnow
function scale() {
  let orgW = 1050, orgH = 900;
  let w = $('.game-div').width();
  let h = $(window).height();
  // Adjust h for headers, margins etc
  h -= $('#mainNav').outerHeight() + 120;
  // This scaling would fit to width
  let wScale = w / orgW;
  // This scaling would fit to height
  let hScale = h / orgH;
  // This scaling would fit both width and height
  let scaling = Math.min(wScale, hScale);
  // Apply scaling
  $('.board').css('transform', `scale(${scaling})`);
  $('.board').show();
  // Set the holder to the scaled width and height
  $('.board-holder').width(orgW * scaling);
  $('.board-holder').height(orgH * scaling);
}

// Run on page load
scale();
// Run every time the size changes
$(window).resize(scale);



