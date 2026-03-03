class Cricketer {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.matchesPlayed = 0;
    this.stamina = 100;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I play as a ${this.role} and I have played ${this.matchesPlayed} matches with stamina level of ${this.stamina}.`;
  }
}

const player1 = new Cricketer("Dhoni", "Batsman");
console.log(player1.hasOwnProperty("name")); // truelog
console.log(typeof Cricketer); // function
console.log(player1 instanceof Cricketer); // true
console.log(player1.introduce());

console.log("----------------------------------------------");
class Debutant {
  constructor(name) {
    this.name = name;
    this.walkOut = () => {
      return `Hi, I'm ${this.name} and this is my debut match!`;
    };
  }
}

const debutant1 = new Debutant("Rinku Singh");
const debutant2 = new Debutant("Yashasvi Jaiswal");

const somethingFromLastClass = debutant1.walkOut();
const somethingFromLastClass2 = debutant2.walkOut();

console.log(somethingFromLastClass);
console.log(somethingFromLastClass2);
