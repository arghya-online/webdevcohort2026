//Different Console Log Methods
// Normal message
console.log("This is a normal log message");

// Logging variables
const name = "Arghya";
const age = 21;
console.log("Name:", name, "Age:", age);

// Warning message
console.warn("This is a warning message");

// Error message
console.error("This is an error message");

//For an object
const person = {
  name: "Arghya",
  age: 21,
  city: "Kolkata",
};
console.log("Person Object:", person);

//console.table for better visualization of objects
console.table(person);

// Grouping logs
console.group("User Info Group");
console.log("Username:", person.name);
console.log("Role:", person.age);
console.groupEnd();

// Assertion example (shows error if condition is false)
console.assert(age > 25, "Age is not greater than 25");

console.count("Counter");
