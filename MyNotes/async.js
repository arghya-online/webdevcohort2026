// ============= ASYNC/AWAIT & PROMISES TUTORIAL =============
// Promise States: PENDING -> RESOLVED/REJECTED

// 1. BASIC PROMISE - Creating and checking state
const basicPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise resolved!"), 2000);
});
console.log(basicPromise); // Promise { <pending> }

// 2. USING .then() - Handle resolved promises
const simplePromise = new Promise((resolve) => {
  setTimeout(() => resolve("Success!"), 1000);
});
simplePromise.then((result) => console.log("Result:", result));

// 3. CHAINING .then() & ERROR HANDLING
Promise.resolve(5)
  .then((val) => {
    console.log("Chain:", val);
    return val * 2;
  })
  .then((val) => console.log("Result:", val));

Promise.reject("Error!").catch((err) => console.log("Caught:", err));

// 5. PROMISE API METHODS
const instantResolve = Promise.resolve("Instant!");
instantResolve.then(console.log);

// Promise.all() - Wait for all promises
Promise.all([
  Promise.resolve("Promise 1"),
  Promise.resolve("Promise 2"),
  Promise.resolve("Promise 3"),
]).then((results) => console.log("All resolved:", results));

// Promise.race() - First to finish wins
Promise.race([
  new Promise((res) => setTimeout(() => res("First"), 1000)),
  new Promise((res) => setTimeout(() => res("Second"), 500)),
]).then((winner) => console.log("Winner:", winner));

// 6. ASYNC/AWAIT - Modern syntax (cleaner than .then())
const delayedPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Data fetched!"), 2000);
});

async function modernApproach() {
  console.log("Fetching...");
  const result = await delayedPromise; // Wait for promise
  console.log("Result:", result);
}
modernApproach();

// 7. ERROR HANDLING WITH TRY/CATCH
const failingPromise = new Promise((res, rej) => {
  setTimeout(() => rej("Connection failed!"), 1500);
});

async function handleError() {
  try {
    const result = await failingPromise;
    console.log(result);
  } catch (error) {
    console.log("Caught error:", error);
  } finally {
    console.log("Finally always runs");
  }
}
handleError();

// 8. PRACTICAL EXAMPLE - Simulated API call
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: "Sumedha", email: "sumedha@example.com" },
        2: { id: 2, name: "Arghya", email: "arghya@example.com" },
      };
      resolve(users[userId]);
    }, 1000);
  });
}

async function getUserInfo(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log("User:", user);
  } catch (error) {
    console.log("Error:", error);
  }
}
getUserInfo(1);

// 9. FETCH MULTIPLE USERS with Promise.all()
async function fetchMultipleUsers() {
  const users = await Promise.all([
    fetchUserData(1), // Sumedha
    fetchUserData(2), // Arghya
  ]);
  console.log("All users:", users);
}
fetchMultipleUsers();
