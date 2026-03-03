function TataCar(model, color, year) {
  this.model = model;
  this.color = color;
  this.year = year;
}
TataCar.prototype.status = function () {
  return `${this.model} is a ${this.color} car from ${this.year}.`;
};

const car1 = new TataCar("Nexon", "Red", 2020);
const car2 = new TataCar("Harrier", "Blue", 2021);

console.log(car1.model);
console.log(car1.color);
console.log(car2.color);
console.log(car2.model);
console.log(car1.status());
console.log(car2.status());

//basically yeh isme this ka matlab hota hai ki jis object ke context me function call ho raha hai uska reference deta hai. Jaise ki car1.status() me this car1 ko refer karega aur car2.status() me this car2 ko refer karega. Isliye dono cars ke status alag alag honge.

function createAutoRickShaw(id, route) {
  return {
    id,
    route,
    run() {
      return `Auto Rickshaw ${this.id} is running on route ${this.route}`;
    },
  };
}

const auto1 = createAutoRickShaw(101, "Karunamayee to Mahishbathan");
const auto2 = createAutoRickShaw(102, "Garia to Esplanade");

console.log(auto1.run());
console.log(auto2.run());
