if (true) {
  var leakyTreasure = "gold";
}

console.log(leakyTreasure); // Output: "gold"
// It should not be accessible outside the block, but it is due to var's function scope. What happens is that var does not respect block scope, so it is hoisted to the function level (or global level if not in a function), making it accessible outside the block. This can lead to unintended consequences and bugs in larger codebases.

for (var i = 0; i < 7; i++) {
  console.log("Inside loop:", i);
}
console.log("Outside loop:", i); // Output: 7
// The variable i is accessible outside the loop and retains its last value (7) because var does not have block scope. This can lead to unexpected behavior if you try to use i later in the code, as it may not be what you intended.
