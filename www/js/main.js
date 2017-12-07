// Scaling for boardgame
function scale() {
  let orgW = 490, orgH = 420;
  let w = $(window).width();
  let h = $(window).height();
  let wScale = orgW / orgW;
  let hScale = orgH / orgH;
  let scaling = Math.min(wScale, hScale);
  $('.board').css('transform', `scale(${scaling})`);
  $('.board').show();
  // $('.board').width(orgW * scaling);
  // $('.board').height(orgH * scaling);
}
scale();
$(window).resize(scale);