// Require asleep 
var asleep = require("asleep");

// A counter
var co = 1;

// A loop that works like an interval
while(1){
  console.log("Hi there " + co++);
  await asleep(2000);
}
