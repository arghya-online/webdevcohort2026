/**
 * ============================================================
 * ASYNC/AWAIT & PROMISES - TUTORIAL & LEARNING GUIDE
 * ============================================================
 *
 * This file covers:
 * 1. Promise States and Basics
 * 2. Promise Resolution and .then()
 * 3. Promise API Methods
 * 4. Async/Await Fundamentals
 * 5. Error Handling with Try/Catch
 */

// ========== SECTION 1: PROMISE BASICS ==========

console.log("\n--- SECTION 1: Promise Basics ---\n");

/**
 * A Promise has three states:
 * 1. PENDING: Initial state, operation hasn't completed yet
 * 2. RESOLVED (FULFILLED): Operation completed successfully
 * 3. REJECTED: Operation failed
 */

// Creating a basic promise with resolve (success) callback
const basicPromise = new Promise((resolve, reject) => {
  // resolve and reject are callback functions passed by the Promise constructor
  // resolve() - called when operation succeeds
  // reject() - called when operation fails

  setTimeout(() => {
    resolve("Promise is resolved!");
  }, 2000); // Wait 2 seconds, then resolve
});

console.log(basicPromise); // Output: Promise { <pending> }

// The promise is pending at first. We'll see the resolved value using .then()

// ========== SECTION 2: PROMISE RESOLUTION WITH .then() ==========

console.log("\n--- SECTION 2: Promise Resolution & .then() ---\n");

/**
 * .then() method is used to handle resolved promises
 * The value passed to resolve() is received in .then()
 */

const simplePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Operation completed successfully!");
  }, 1500);
});

// Method 1: Using .then() with explicit callback
simplePromise.then((result) => {
  console.log("Result from promise:", result);
});

// Method 2: Chain multiple .then() calls
const chainedPromise = new Promise((resolve) => {
  resolve(5);
});

chainedPromise
  .then((value) => {
    console.log("First .then():", value); // 5
    return value * 2; // Return transformed value
  })
  .then((value) => {
    console.log("Second .then():", value); // 10
    return value + 5;
  })
  .then((value) => {
    console.log("Third .then():", value); // 15
  });

// ========== SECTION 3: ERROR HANDLING WITH .catch() ==========

console.log("\n--- SECTION 3: Error Handling with .catch() ---\n");

/**
 * .catch() method is used to handle rejected promises
 * If any promise rejects, .catch() will catch the error
 */

const rejectedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!"); // Reject the promise
  }, 1000);
});

rejectedPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error caught:", error); // This will execute
  });

/**
 * Combining .then() and .catch()
 * Pattern: Promise -> .then(success) -> .catch(error)
 */
const combinedPromise = new Promise((resolve) => {
  resolve("All good!");
});

combinedPromise
  .then((res) => console.log(res))
  .catch((err) => console.log("Error:", err));

// ========== SECTION 4: PROMISE API METHODS ==========

console.log("\n--- SECTION 4: Promise API Methods ---\n");

/**
 * Promise.resolve() - Instantly creates a resolved promise
 * Useful for converting values to promises
 */
const instantResolve = Promise.resolve("Instantly resolved!");
console.log("Promise.resolve():", instantResolve);
instantResolve.then(console.log);

/**
 * Promise.reject() - Instantly creates a rejected promise
 * Useful for error scenarios
 */
const instantReject = Promise.reject("Instantly rejected!");
instantReject.catch((err) => console.log("Caught rejection:", err));

/**
 * Promise.all() - Waits for all promises to resolve
 * Returns array of all results in order
 * If ANY promise rejects, the entire .all() rejects
 */
console.log("\nPromise.all() example:");

const allPromises = Promise.all([
  Promise.resolve("Promise 1 resolved"),
  Promise.resolve("Promise 2 resolved"),
  Promise.resolve("Promise 3 resolved"),
]);

allPromises
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.log("One promise failed:", error);
  });

/**
 * Promise.race() - Returns result of first settled promise
 * (whichever resolves or rejects first)
 */
console.log("\nPromise.race() example:");

const racePromises = Promise.race([
  new Promise((res) => setTimeout(() => res("First"), 1000)),
  new Promise((res) => setTimeout(() => res("Second"), 500)),
  new Promise((res) => setTimeout(() => res("Third"), 1500)),
]);

racePromises.then((winner) => {
  console.log("Race winner:", winner); // Will be "Second"
});

// ========== SECTION 5: ASYNC/AWAIT BASICS ==========

console.log("\n--- SECTION 5: Async/Await Basics ---\n");

/**
 * Async/Await is syntactic sugar over Promises
 * Makes asynchronous code look and behave like synchronous code
 *
 * Rules:
 * - async function always returns a Promise
 * - await can only be used inside async function
 * - await pauses execution until Promise settles
 */

// Create a promise for demonstration
const delayedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data fetched after 2 seconds!");
  }, 2000);
});

// Traditional .then() approach
function traditionalApproach() {
  console.log("Fetching data...");
  return delayedPromise
    .then((result) => {
      console.log("Result:", result);
    });
}

// Modern async/await approach
async function modernApproach() {
  console.log("Fetching data (async)...");
  const result = await delayedPromise; // Waits for promise to resolve
  console.log("Result (async):", result);
}

// Call the async function
modernApproach();

/**
 * Async function automatically wraps return value in Promise
 */
async function getProcessedData() {
  const data = await delayedPromise;
  return `Processed: ${data}`; // Implicitly wrapped in Promise
}

getProcessedData().then(console.log);

// ========== SECTION 6: ERROR HANDLING WITH TRY/CATCH ==========

console.log("\n--- SECTION 6: Error Handling with Try/Catch ---\n");

/**
 * Use try/catch inside async functions for clean error handling
 * try block: code that might fail
 * catch block: handles errors
 */

async function safeAsyncOperation() {
  try {
    const result = await delayedPromise;
    console.log("Success:", result);
  } catch (error) {
    console.log("Error caught in try/catch:", error);
  }
}

safeAsyncOperation();

/**
 * Simulating error scenario
 */
const failingPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Database connection failed!");
  }, 1500);
});

async function handleError() {
  try {
    console.log("Attempting operation...");
    const result = await failingPromise;
    console.log("Result:", result);
  } catch (error) {
    console.log("Caught error:", error); // This will execute
  } finally {
    console.log("Operation complete (finally block always runs)");
  }
}

handleError();

/**
 * Multiple awaits in sequence
 */
async function sequentialOperations() {
  try {
    console.log("\nStarting sequential operations...");
    
    const result1 = await Promise.resolve("Step 1 done");
    console.log(result1);
    
    const result2 = await Promise.resolve("Step 2 done");
    console.log(result2);
    
    const result3 = await Promise.resolve("Step 3 done");
    console.log(result3);
    
    console.log("All steps completed!");
  } catch (error) {
    console.log("Error:", error);
  }
}

sequentialOperations();

// ========== SECTION 7: PRACTICAL EXAMPLES ==========

console.log("\n--- SECTION 7: Practical Examples ---\n");

/**
 * Example 1: Simulating API call with async/await
 */
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "John Doe",
        email: "john@example.com"
      });
    }, 1000);
  });
}

async function getUserInfo(userId) {
  try {
    console.log("Fetching user...");
    const user = await fetchUserData(userId);
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.log("Failed to fetch user:", error);
  }
}

getUserInfo(123);

/**
 * Example 2: Promise.all() with async/await
 */
async function fetchMultipleUsers() {
  try {
    console.log("\nFetching multiple users...");
    const users = await Promise.all([
      fetchUserData(1),
      fetchUserData(2),
      fetchUserData(3),
    ]);
    console.log("All users fetched:", users);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
}

fetchMultipleUsers();

// ========== END OF TUTORIAL ==========

console.log("\n--- End of Async/Await Tutorial ---\n");
