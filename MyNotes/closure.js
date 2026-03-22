//lexical scoping basically hota hain ki ek function ke andar dusre function ko define kar sakte hain aur inner function outer function ke variables ko access kar sakta hain.

function makeFunc() {
  let name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();
