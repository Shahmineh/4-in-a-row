const flexjson = require('jsonflex')();

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

let personsRevived = JSON._parse(json);

console.log(personsRevived[0].pets[1].sayHi());