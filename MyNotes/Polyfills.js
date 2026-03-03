//First lets use a simple array methods

items = ["Apple", "Banana", "Cherry"];
console.log(items);

items.push("Mango");
console.log(items);

//what push does is it adds an element to the end of the array.

//Now if i want to delete all elemnts and keep the last element, there is no method exists for that, but we can create a method for that using prototype.

//Now lets think of a operation that is not supported by the browser, for example, `Array.prototype.last` method which returns the last element of the array. This method is not supported in older browsers, so we can create a polyfill for it.

Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3, 4, 5].last());
console.log(["Arghya", "Sarnak", "Hitesh"].last());
