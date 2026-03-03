const prithiviraj = {
  name: "prithiviraj",
  generation: "Grandfather",
  cookTraditionalRecipe: function () {
    return `${this.name} cooks a traditional recipe, he is a ${this.generation}`;
  },
};

console.log(prithiviraj);

const raj = Object.create(prithiviraj);
raj.name = "Raj";
raj.generation = "Father";
console.log(raj.cookTraditionalRecipe());

//lets make another prototype for son

const arjun = Object.create(raj);
arjun.name = "Arjun";
arjun.generation = "Son";
console.log(arjun);

console.log(arjun.cookTraditionalRecipe());
console.log(prithiviraj.cookTraditionalRecipe());

Array.prototype.last = function () {
  return this[this.length - 1];
};
console.log();

//Polyfill is a code that adds a feature which is not supported by the browser. It is a way to provide support for older browsers that do not have certain features. For example, if we want to use the `Array.prototype.last` method in older browsers that do not support it, we can create a polyfill for it.

//Like lets take a new example of `Array.prototype.includes` method which is not supported in older browsers. We can create a polyfill for it like this:

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.hitesh = "hitesh";

console.log([1, 2, 3, 4, 5]);

console.log([1, 2, 3, 4, 5].last());
console.log(["Arghya", "Sarnak", "Hitesh"].last());
