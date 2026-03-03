const aadhar_of_arghya = Symbol("aadhar");
const aadhar_of_rahul = Symbol("aadhar");

console.log(typeof aadhar_of_arghya);
console.log(aadhar_of_arghya === aadhar_of_rahul); // false

console.log(aadhar_of_arghya.toString());
console.log(aadhar_of_rahul.description);

const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenData = {
  name: "Arghya",
  age: 30,
  [biometricHash]: "a56gfuabc123",
  [bloodGroup]: "O+",
};

console.log(citizenData.name); // Arghya
console.log(citizenData.age);
console.log(citizenData[biometricHash]); // a56gfuabc123
console.log(citizenData[bloodGroup]); // O+

//Symbol is basically a unique identifier that can be used as a property key in objects. It helps to avoid name collisions and provides a way to create private properties in JavaScript.

//Basically symbol karta kya hain ki wo ek unique identifier create karta hain, jiska use hum object ke properties ke liye kar sakte hain.

console.log(Object.getOwnPropertySymbols(citizenData)); // [ Symbol(biometricHash), Symbol(bloodGroup) ]

console.log(
  "-----------------------------------------------------------------------",
);

const RTIQueryBook = {
  queries: [
    "Infra Budget",
    "Education Budget",
    "Health Budget",
    "Defense Budget",
    "Agriculture Budget",
    "Transport Budget",
  ],

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.queries.length) {
          return { value: this.queries[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const query of RTIQueryBook) {
  console.log(`Filing RTI: ${query}`);
}
