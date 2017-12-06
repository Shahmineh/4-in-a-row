# asleep 1.0.3

Non-blocking sleep in ES7 (or, in ES6, setTimeout as a promise). 

This is mostly a syntactic alternative to *setTimeout* in ES6, but in ES7 combined with a loop it will provide a syntactically cleaner alternative to *setInterval*.

> Due to the very limited code base of this module, we do not anticipate needing to make very many changes to it. 

## Require the module
```javascript
var asleep = require("asleep");
```

## Usage in ES6

```javascript
// Sleep for 2 seconds (2000 ms), then do something
asleep(2000).then(function(){
  console.log('Waking up!');
});
```

## Usage in ES7

```javascript
// Inside any async function:
// Sleep for 2 seconds (2000 ms), then do something
await asleep(2000);
console.log('Waking up!');
```

### Example 2
```javascript
// Inside any type of loop in any async function:
while(1){
  await asleep(1000);
  console.log('I say: "Hi" every second!');
}
```
**Please note:** This is non-blocking, other code will continue to run while your async function "sleeps". 

[Read more about async...await](https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html)
