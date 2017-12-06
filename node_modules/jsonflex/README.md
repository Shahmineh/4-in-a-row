# jsonflex
A JSON stringifier and parser than handles and restores circular references and as well as class instances.

## Installation

```
npm install jsonflex
```

Then in your node.js application:

```javascript
const flexjson = require('jsonflex')();

// And: If you want to use flexjson on frontend
// you can serve it as Express middleware
const express = require('express');
const app = express();
app.use(flexjson);
```

### Options
There are four options you can change if you want to. Add any or all of them when requiring **flexjson**. Below they are listed with their default values:

```javascript
  const flexjson = require('jsonflex')({
    jsonDir: '/www/json', // directory on server to save json to
    scriptUrl: '/jsonflex.js', // url to load clientside script from
    saveUrl: '/json-save', // url used by jsonflex to save json
    loadUrlPrefix: '/json/' // prefix to add to clientside load url
  }));
```

### Include clientside
Include the script clientside like this:

```html
<script src="/jsonflex.js"></script>
```

**Note:** 
For non-Node.js users... If you want to use this script clientside only (without Node.js) you can do so:
* Locate **jsonflex.js**-file in the repository, load only this file and note that JSON._save won't work out of the box.

## API

### JSON._save(filename, data, [, replacer[, space]])
Saves JavaScript data to a file after parsing it to JSON using JSON._stringify.
Returns a promise.

#### Example

```javascript
let persons = [{name:'Anna', name: 'Bob', name: 'Cecilia'}];
JSON._save('persons.json', persons).then(function(){
  console.log('Saved!');
});
```

Or with await syntax inside an async function:
```javascript
let persons = [{name:'Anna', name: 'Bob', name: 'Cecilia'}];
await JSON._save(persons);
console.log('Saved!');
```


### JSON._load(filename [, reviver])
Loads JSON from a file and parses it to JavaScript data using JSON._parse.
Returns a promise.

#### Example

```javascript
JSON._load('persons.json').then(function(persons){
  console.log(persons);
});
```

Or with await syntax inside an async function:
```javascript
let persons = await JSON._load('persons.json');
console.log(persons);
```

**Note:** When used on the clientside JSON._load actually takes an URL rather than a file path as its argument.

### JSON._classes(...classes)
Registers class definitions so that JSON._stringify and JSON._parse knows about them and can revive object instances created from classes.

#### Example
```javascript
// Earlier in your code you have defined the classes Person and Pet
JSON._classes(Person, Pet);
```

### JSON._stringify(data [, replacer[, space]])
Works just like the normal *JSON.stringify* but translates circular references to JSON paths and (optionally, see JSON._classes) "stamps" every object created from a class with its class name.

#### Example
```javascript
const flexjson = require('jsonflex.js')();

class Person {
  constructor(name, pets = []){
    this.name = name;
    this.pets = pets;
    for(let pet of pets){
      pet.owner = this;
    }
  }
  sayHi(){
    return `Hi! I am ${this.name}!`
  }
}

class Pet {
  constructor(name, owner){
    this.name = name;
    this.owner = owner;
  }
  sayHi(){
    return `Hi! I am ${this.name}! My owner is ${this.owner.name}!`;
  }
}

JSON._classes(Person, Pet);

let pets = [
  new Pet('Fido'),
  new Pet('Garfield'),
  new Pet('Chili')
];

let persons = [
  new Person('Anna',[pets[0], pets[1]]),
  new Person('Bob', [pets[2]])
];

let json = JSON._stringify(persons);

console.log(json);
```

The contents of the variable **json** would now be:

```json
[
  {
    "name": "Anna",
    "pets": [
      {
        "name": "Fido",
        "owner": {
          "↻": "$[0]"
        },
        "⚙": "Pet"
      },
      {
        "name": "Garfield",
        "owner": {
          "↻": "$[0]"
        },
        "⚙": "Pet"
      }
    ],
    "⚙": "Person"
  },
  {
    "name": "Bob",
    "pets": [
      {
        "name": "Chili",
        "owner": {
          "↻": "$[1]"
        },
        "⚙": "Pet"
      }
    ],
    "⚙": "Person"
  }
]
```

### JSON._parse(data [, reviver])
Works just like the normal *JSON.parse* but translates JSON paths to circular references and (optionally, see JSON._classes) revives object instances.

#### Example
Given that we have the JSON from the *JSON._stringify*-example we can now revive it like this:

```javascript
JSON._classes(Person, Pet);

let personsRevived = JSON._parse(json);

console.log(personsRevived[0].pets[1].sayHi());
// => Hi! I am Garfield! My owner is Anna!
