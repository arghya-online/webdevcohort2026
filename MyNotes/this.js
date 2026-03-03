console.log(this);

function sushantOnGlobalStage() {
  return typeof this;
}

console.log(sushantOnGlobalStage());

function sushantWithNoScript() {
  return this;
}
console.log(sushantWithNoScript);

const bollywoodFilm = {
  name: "3 Idiots",
  lead: "Sushant Singh Rajput",

  introduce() {
    return `This is ${this.name} starring ${this.lead}`;
  },

  //introuce actally ek method hai, jisme this keyword ka use kiya gaya hai. Yeh intriduce ki jagah "bingbong likhte, to bhi chalta. Jab hum is method ko call karenge, to this keyword us object ko refer karega jisme ye method defined hai, yani ki bollywoodFilm object ko. Isliye jab hum introduce method ko call karenge, to it will return "This is 3 Idiots starring Sushant Singh Rajput".
};
console.log(bollywoodFilm.introduce());

const filmDirector = {
  name: "Rajkumar Hirani",
  cast: ["Amir Khan", "R Madhavan", "Sharman Joshi"],

  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${actor} is part of the cast of ${this.name}`);
    });
  },
};

// forEach is a loop method that iterates over each element in the cast array. Inside the forEach loop, we use an arrow function to access the current actor and print a message that includes the actor's name and the director's name. The this keyword inside the announceCast method refers to the filmDirector object, allowing us to access both the cast array and the name property of the director.

filmDirector.announceCast();

//This filmDirector.announceCast() will refer to filmDirector object, so it will print the name of the director along with the cast members in the array and will start from index 0 to the end of the array.

const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew ${this.crew}`);

    function arrangeChairs() {
      console.log(`Inner this.crew ${this.crew}`);
      // kyunki a reguler nestted fuction "this" ko inherit nahi karta, isliye inner this.crew undefined hoga. Agar hum arrow function ka use karte, to inner this.crew bhi "Spot boys" hoga.
    }
    arrangeChairs();

    const arrangeLights = () => {
      console.log(`Arrow function this.crew ${this.crew}`);
    };
    arrangeLights();
    //what happens here is that the arrow function does not have its own "this" context, so it inherits the "this" from the surrounding scope, which is the prepareProps method. Since prepareProps is a method of the filmSet object, "this" refers to filmSet, and therefore this.crew will correctly access the crew property of the filmSet object, resulting in "Arrow function this.crew Spot boys".
  },
};
filmSet.prepareProps();

//Detached Methods

const actor = {
  name: "Sushant Singh Rajput",
  bow() {
    return `${this.name} takes a bow.`;
  },
};

const detachedBow = actor.bow; // Here we are detaching the bow method from the actor object and storing it in a variable called detachedBow.

console.log(detachedBow()); // When we call detachedBow(), it will not have the correct "this" context, so it will return "undefined takes a bow." instead of "Sushant Singh Rajput takes a bow." because "this.name" will be undefined in the context of detachedBow.
