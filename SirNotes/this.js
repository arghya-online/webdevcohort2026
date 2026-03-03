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
  name: "MS DHONI",
  lead: "Sushant",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};

console.log(bollywoodFilm.introduce());

const filmDirector = {
  name: "Lokesh",
  cast: ["Sushant", "Bairya", "Kaithi"],
  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${this.name} introduces ${actor}`);
    });
  },
};
//
filmDirector.announceCast();

const filmSet = {
  crew: "Spot Boys",
  prepareProps() {
    console.log(`Outer this.crew : ${this.crew}`);

    function arrangeChairs() {
      console.log(`Inner this.crew : ${this.crew}`);
    }
    arrangeProps.call(this);
  },
};

filmSet.prepareProps();

//Detached Methods
const actor = {
  name: "Sushant",
  bow() {
    return `${this.name} takes a bow`;
  },
};

const detachedBow = actor.bow;
console.log(detachedBow());
