// call and apply => basic chef(kitchen)
//bind => return a new function

function coockedDish(ingredient, style) {
  return `${this.name} prepares ${ingredient} in ${style} style.`;
}

const sharmaKitchen = {
  name: "Sharma's Kitchen",
};
const singhKitchen = {
  name: "Singh's Kitchen",
};

console.log(coockedDish.call(sharmaKitchen, "Pasta", "Italian"));
console.log(coockedDish.call(singhKitchen, "Biryani", "Indian"));

// calll basiacally ek method hai jo hume ek function ko call karne ke liye allow karta hai, aur us function ke andar "this" keyword ko specify karne ke liye use hota hai. Iska syntax hai: functionName.call(thisArg, arg1, arg2, ...). Yahan "thisArg" wo object hota hai jise hum "this" ke roop mein use karna chahte hain, aur arg1, arg2, ... wo arguments hote hain jo hum function ko pass karna chahte hain.

console.log(coockedDish.apply(sharmaKitchen, ["Pasta", "Italian"]));
console.log(coockedDish.apply(singhKitchen, ["Biryani", "Indian"]));

// apply bhi call ki tarah hi hai, lekin isme arguments ko array ke form mein pass kiya jata hai. Iska syntax hai: functionName.apply(thisArg, [arg1, arg2, ...]). Yahan "thisArg" wo object hota hai jise hum "this" ke roop mein use karna chahte hain, aur [arg1, arg2, ...] wo arguments hote hain jo hum function ko array ke form mein pass karna chahte hain.

const singhOrder = ["Paneer Butter Masala", "Naan"];
const sharmaOrder = ["Spaghetti Carbonara", "Garlic Bread"];
console.log(coockedDish.apply(singhKitchen, singhOrder));
console.log(coockedDish.apply(sharmaKitchen, sharmaOrder));

//yeh bills array ke andar kuch numbers hain, aur hum Math.max.apply(null, bills) ka use karke un numbers mein se maximum value ko find kar rahe hain. Math.max function ko apply method ke through call kiya gaya hai, jisme pehla argument null hai (kyunki Math.max ko kisi specific "this" context ki zarurat nahi hai), aur doosra argument bills array hai. Iska result maxBill variable mein store hoga, jo ki bills array ke andar sabse bada number hoga. Finally, console.log(maxBill) se us maximum value ko print kiya jayega.
//basically apply method ek array mein operations perform karne ke liye use hota hai, jisme hum ek function ko call karte hain aur us function ke arguments ko array ke form mein pass karte hain. Is case mein, Math.max function ko apply method ke through call kiya gaya hai, jisme bills array ke numbers ko arguments ke roop mein pass kiya gaya hai, taaki hum unmein se maximum value ko find kar sakein.
const bills = [1004, 400, 300, 200];
const maxBill = Math.max.apply(null, bills);
console.log(maxBill);

//another example of apply

const mobiles = [
  { brand: "Apple", price: 999 },
  { brand: "Samsung", price: 899 },
  { brand: "OnePlus", price: 799 },
];

const bestDeal = mobiles.map((mobile) => mobile.price);
const deal = Math.min.apply(null, bestDeal);

console.log(
  `The best and cheapest phone is ${mobiles.find((m) => m.price === deal)?.brand}, jiska price hain ${deal}`,
);

//yahan apply method ka use karke hum mobiles array ke andar se sabse sasta mobile ka price find kar rahe hain. Ek array mein mobiles ke data likha hain, then apply method ke through Math.min function ko call kiya gaya hai, jisme pehla argument null hai (kyunki Math.min ko kisi specific "this" context ki zarurat nahi hai), aur doosra argument bestDeal array hai, jo mobiles array ke andar se sabhi mobile ke prices ko store karta hai. Iska result minPrice variable mein store hoga, jo ki mobiles array ke andar sabse sasta mobile ka price hoga. Finally, console.log(minPrice) se us minimum price ko print kiya jayega.

function reportDelivery(location, status) {
  return `${this.name} at ${location}: ${status}`;
}

const deliveryBoy = "Ranveer"

console.log("Call: ", reportDelivery.call(deliveryBoy, "Lyari", "Ordered"));

console.log("Apply: ", reportDelivery.apply(deliveryBoy, ["Lyari", "Ordered"]));

console.log("Apply: ", reportDelivery.bind(deliveryBoy, "Haridwar", "WHAT"));

