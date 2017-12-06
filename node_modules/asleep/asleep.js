/*
  asleep 1.0.3
 
  April 2016 Nodebite AB, Thomas Frank

  MIT Licensed - use anywhere you want!

  Non-blocking sleep in ES7 (or, in ES6, setTimeout as a promise)
*/

/*
  Nodebite code style -> jshint settings below, also 
  indent = 2 spaces, keep your rows reasonably short
  also try to keep your methods below sceen height.
*/
/* jshint 
  loopfunc: true,
  trailing: true,
  sub: true,
  expr: true,
  noarg: false,
  forin: false
*/

module.exports = function(sleepMs){
  var res;
  setTimeout(function(){ res(); }, sleepMs);
  return new Promise(function(a){ res = a; });
};
