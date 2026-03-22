// ============================================
// CUSTOM POLYFILLS LIBRARY
// ============================================

console.log("Loading Custom Polyfills...\n");

// ============================================
// ARRAY POLYFILLS
// ============================================

// Array.prototype.map()
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myMap called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;
    const result = new Array(len);

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        result[i] = callback.call(thisArg, arr[i], i, arr);
      }
    }

    return result;
  };
}

// Array.prototype.filter()
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myFilter called on null or undefined",
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;
    const result = [];

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        const val = arr[i];
        if (callback.call(thisArg, val, i, arr)) {
          result.push(val);
        }
      }
    }

    return result;
  };
}

// Array.prototype.reduce()
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (callback, initialValue) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myReduce called on null or undefined",
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;
    let accumulator;
    let startIndex = 0;

    if (arguments.length >= 2) {
      accumulator = initialValue;
    } else {
      // Find first valid index
      while (startIndex < len && !(startIndex in arr)) {
        startIndex++;
      }
      if (startIndex >= len) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      accumulator = arr[startIndex++];
    }

    for (let i = startIndex; i < len; i++) {
      if (i in arr) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
    }

    return accumulator;
  };
}

// Array.prototype.forEach()
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myForEach called on null or undefined",
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        callback.call(thisArg, arr[i], i, arr);
      }
    }
  };
}

// Array.prototype.find()
if (!Array.prototype.myFind) {
  Array.prototype.myFind = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myFind called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        const val = arr[i];
        if (callback.call(thisArg, val, i, arr)) {
          return val;
        }
      }
    }

    return undefined;
  };
}

// Array.prototype.findIndex()
if (!Array.prototype.myFindIndex) {
  Array.prototype.myFindIndex = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myFindIndex called on null or undefined",
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        if (callback.call(thisArg, arr[i], i, arr)) {
          return i;
        }
      }
    }

    return -1;
  };
}

// Array.prototype.some()
if (!Array.prototype.mySome) {
  Array.prototype.mySome = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.mySome called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        if (callback.call(thisArg, arr[i], i, arr)) {
          return true;
        }
      }
    }

    return false;
  };
}

// Array.prototype.every()
if (!Array.prototype.myEvery) {
  Array.prototype.myEvery = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myEvery called on null or undefined",
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in arr) {
        if (!callback.call(thisArg, arr[i], i, arr)) {
          return false;
        }
      }
    }

    return true;
  };
}

// Array.prototype.flat()
if (!Array.prototype.myFlat) {
  Array.prototype.myFlat = function (depth = 1) {
    if (this == null) {
      throw new TypeError("Array.prototype.myFlat called on null or undefined");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;
    const result = [];

    const flatten = (array, currentDepth) => {
      for (let i = 0; i < array.length; i++) {
        if (i in array) {
          const element = array[i];
          if (Array.isArray(element) && currentDepth > 0) {
            flatten(element, currentDepth - 1);
          } else {
            result.push(element);
          }
        }
      }
    };

    flatten(arr, depth);
    return result;
  };
}

// Array.prototype.includes()
if (!Array.prototype.myIncludes) {
  Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.myIncludes called on null or undefined",
      );
    }

    const arr = Object(this);
    const len = arr.length >>> 0;

    if (len === 0) {
      return false;
    }

    let startIndex = fromIndex | 0;
    if (startIndex < 0) {
      startIndex = Math.max(len + startIndex, 0);
    }

    for (let i = startIndex; i < len; i++) {
      const element = arr[i];
      // Special handling for NaN
      if (
        element === searchElement ||
        (element !== element && searchElement !== searchElement)
      ) {
        return true;
      }
    }

    return false;
  };
}

// ============================================
// FUNCTION POLYFILLS
// ============================================

// Function.prototype.bind()
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function (context, ...boundArgs) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.myBind called on non-function");
    }

    const originalFunction = this;

    return function (...args) {
      return originalFunction.apply(context, [...boundArgs, ...args]);
    };
  };
}

// Function.prototype.call()
if (!Function.prototype.myCall) {
  Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.myCall called on non-function");
    }

    context = context || globalThis;
    const uniqueKey = Symbol("fn");
    context[uniqueKey] = this;

    const result = context[uniqueKey](...args);
    delete context[uniqueKey];

    return result;
  };
}

// Function.prototype.apply()
if (!Function.prototype.myApply) {
  Function.prototype.myApply = function (context, args = []) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.myApply called on non-function");
    }

    if (!Array.isArray(args) && args !== null && args !== undefined) {
      throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context = context || globalThis;
    const uniqueKey = Symbol("fn");
    context[uniqueKey] = this;

    const result = context[uniqueKey](...(args || []));
    delete context[uniqueKey];

    return result;
  };
}

// ============================================
// OBJECT POLYFILLS
// ============================================

// Object.assign()
if (!Object.myAssign) {
  Object.myAssign = function (target, ...sources) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const to = Object(target);

    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];

      if (source != null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }
      }
    }

    return to;
  };
}

// Object.keys()
if (!Object.myKeys) {
  Object.myKeys = function (obj) {
    if (obj == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const result = [];
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result.push(key);
      }
    }

    return result;
  };
}

// Object.values()
if (!Object.myValues) {
  Object.myValues = function (obj) {
    if (obj == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const result = [];
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result.push(obj[key]);
      }
    }

    return result;
  };
}

// Object.entries()
if (!Object.myEntries) {
  Object.myEntries = function (obj) {
    if (obj == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    const result = [];
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result.push([key, obj[key]]);
      }
    }

    return result;
  };
}

// Object.create()
if (!Object.myCreate) {
  Object.myCreate = function (proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object or null");
    }

    function F() {}
    F.prototype = proto;
    const obj = new F();

    if (propertiesObject !== undefined) {
      Object.defineProperties(obj, propertiesObject);
    }

    return obj;
  };
}

// ============================================
// STRING POLYFILLS
// ============================================

// String.prototype.includes()
if (!String.prototype.myIncludes) {
  String.prototype.myIncludes = function (search, start = 0) {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myIncludes called on null or undefined",
      );
    }

    if (search instanceof RegExp) {
      throw new TypeError(
        "First argument to String.prototype.includes must not be a regular expression",
      );
    }

    const str = String(this);
    return str.indexOf(search, start) !== -1;
  };
}

// String.prototype.startsWith()
if (!String.prototype.myStartsWith) {
  String.prototype.myStartsWith = function (search, position = 0) {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myStartsWith called on null or undefined",
      );
    }

    const str = String(this);
    const searchStr = String(search);
    const pos = Math.max(0, Math.min(position, str.length));

    return str.substring(pos, pos + searchStr.length) === searchStr;
  };
}

// String.prototype.endsWith()
if (!String.prototype.myEndsWith) {
  String.prototype.myEndsWith = function (search, length) {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myEndsWith called on null or undefined",
      );
    }

    const str = String(this);
    const searchStr = String(search);
    const len =
      length === undefined
        ? str.length
        : Math.min(Math.max(0, length), str.length);

    return str.substring(len - searchStr.length, len) === searchStr;
  };
}

// String.prototype.repeat()
if (!String.prototype.myRepeat) {
  String.prototype.myRepeat = function (count) {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myRepeat called on null or undefined",
      );
    }

    const str = String(this);
    const n = Math.floor(count);

    if (n < 0 || n === Infinity) {
      throw new RangeError("Invalid count value");
    }

    let result = "";
    for (let i = 0; i < n; i++) {
      result += str;
    }

    return result;
  };
}

// String.prototype.trim()
if (!String.prototype.myTrim) {
  String.prototype.myTrim = function () {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myTrim called on null or undefined",
      );
    }

    return String(this).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}

// String.prototype.padStart()
if (!String.prototype.myPadStart) {
  String.prototype.myPadStart = function (targetLength, padString = " ") {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myPadStart called on null or undefined",
      );
    }

    const str = String(this);
    const len = targetLength >> 0;

    if (len <= str.length) {
      return str;
    }

    const pad = String(padString);
    if (pad.length === 0) {
      return str;
    }

    const paddingLength = len - str.length;
    const repeatCount = Math.ceil(paddingLength / pad.length);
    const truncatedPad = pad.repeat(repeatCount).substring(0, paddingLength);

    return truncatedPad + str;
  };
}

// String.prototype.padEnd()
if (!String.prototype.myPadEnd) {
  String.prototype.myPadEnd = function (targetLength, padString = " ") {
    if (this == null) {
      throw new TypeError(
        "String.prototype.myPadEnd called on null or undefined",
      );
    }

    const str = String(this);
    const len = targetLength >> 0;

    if (len <= str.length) {
      return str;
    }

    const pad = String(padString);
    if (pad.length === 0) {
      return str;
    }

    const paddingLength = len - str.length;
    const repeatCount = Math.ceil(paddingLength / pad.length);
    const truncatedPad = pad.repeat(repeatCount).substring(0, paddingLength);

    return str + truncatedPad;
  };
}

// ============================================
// PROMISE POLYFILL
// ============================================

if (!globalThis.MyPromise) {
  class MyPromise {
    constructor(executor) {
      this.state = "pending"; // pending, fulfilled, rejected
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      const resolve = (value) => {
        if (this.state === "pending") {
          this.state = "fulfilled";
          this.value = value;
          this.onFulfilledCallbacks.forEach((fn) => fn());
        }
      };

      const reject = (reason) => {
        if (this.state === "pending") {
          this.state = "rejected";
          this.reason = reason;
          this.onRejectedCallbacks.forEach((fn) => fn());
        }
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    then(onFulfilled, onRejected) {
      onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : (value) => value;
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            };

      const promise2 = new MyPromise((resolve, reject) => {
        if (this.state === "fulfilled") {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        } else if (this.state === "rejected") {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        } else if (this.state === "pending") {
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value);
                this.resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });

          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onRejected(this.reason);
                this.resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }
      });

      return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
      if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected"));
      }

      if (x instanceof MyPromise) {
        x.then(resolve, reject);
      } else {
        resolve(x);
      }
    }

    catch(onRejected) {
      return this.then(null, onRejected);
    }

    finally(callback) {
      return this.then(
        (value) => MyPromise.resolve(callback()).then(() => value),
        (reason) =>
          MyPromise.resolve(callback()).then(() => {
            throw reason;
          }),
      );
    }

    static resolve(value) {
      if (value instanceof MyPromise) {
        return value;
      }
      return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
      return new MyPromise((_, reject) => reject(reason));
    }

    static all(promises) {
      return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
          return reject(new TypeError("Argument must be an array"));
        }

        const results = [];
        let completedCount = 0;

        if (promises.length === 0) {
          return resolve(results);
        }

        promises.forEach((promise, index) => {
          MyPromise.resolve(promise).then(
            (value) => {
              results[index] = value;
              completedCount++;
              if (completedCount === promises.length) {
                resolve(results);
              }
            },
            (reason) => reject(reason),
          );
        });
      });
    }

    static race(promises) {
      return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
          return reject(new TypeError("Argument must be an array"));
        }

        promises.forEach((promise) => {
          MyPromise.resolve(promise).then(resolve, reject);
        });
      });
    }

    static allSettled(promises) {
      return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
          return reject(new TypeError("Argument must be an array"));
        }

        const results = [];
        let completedCount = 0;

        if (promises.length === 0) {
          return resolve(results);
        }

        promises.forEach((promise, index) => {
          MyPromise.resolve(promise).then(
            (value) => {
              results[index] = { status: "fulfilled", value };
              completedCount++;
              if (completedCount === promises.length) {
                resolve(results);
              }
            },
            (reason) => {
              results[index] = { status: "rejected", reason };
              completedCount++;
              if (completedCount === promises.length) {
                resolve(results);
              }
            },
          );
        });
      });
    }
  }

  globalThis.MyPromise = MyPromise;
}

// ============================================
// ARRAY STATIC METHODS
// ============================================

// Array.from()
if (!Array.myFrom) {
  Array.myFrom = function (arrayLike, mapFn, thisArg) {
    if (arrayLike == null) {
      throw new TypeError("Array.from requires an array-like object");
    }

    const items = Object(arrayLike);
    const len = items.length >>> 0;
    const result = [];

    for (let i = 0; i < len; i++) {
      const value = items[i];
      if (mapFn) {
        result.push(mapFn.call(thisArg, value, i));
      } else {
        result.push(value);
      }
    }

    return result;
  };
}

// Array.isArray()
if (!Array.myIsArray) {
  Array.myIsArray = function (value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  };
}

// ============================================
// UTILITY POLYFILLS
// ============================================

// setTimeout polyfill using basic implementation
if (!globalThis.mySetTimeout) {
  globalThis.mySetTimeout = function (callback, delay, ...args) {
    const start = Date.now();
    const check = () => {
      if (Date.now() - start >= delay) {
        callback(...args);
      } else {
        // Keep checking (Note: in real implementation, this would use native setTimeout)
        requestAnimationFrame ? requestAnimationFrame(check) : check();
      }
    };
    check();
  };
}

// JSON.stringify() simplified polyfill
if (!JSON.myStringify) {
  JSON.myStringify = function (value, replacer, space) {
    const stringify = (val, depth = 0) => {
      // Handle null
      if (val === null) return "null";

      // Handle primitives
      if (typeof val === "boolean") return String(val);
      if (typeof val === "number") return isFinite(val) ? String(val) : "null";
      if (typeof val === "string") return '"' + val.replace(/"/g, '\\"') + '"';

      // Handle undefined, functions, symbols
      if (
        val === undefined ||
        typeof val === "function" ||
        typeof val === "symbol"
      ) {
        return undefined;
      }

      // Handle arrays
      if (Array.isArray(val)) {
        const items = val.map((item) => {
          const result = stringify(item, depth + 1);
          return result !== undefined ? result : "null";
        });
        return "[" + items.join(",") + "]";
      }

      // Handle objects
      if (typeof val === "object") {
        const keys = Object.keys(val);
        const pairs = [];

        for (let key of keys) {
          const value = stringify(val[key], depth + 1);
          if (value !== undefined) {
            pairs.push('"' + key + '":' + value);
          }
        }

        return "{" + pairs.join(",") + "}";
      }

      return undefined;
    };

    return stringify(value);
  };
}

// ============================================
// DEBOUNCE & THROTTLE UTILITIES
// ============================================

// Debounce function
if (!globalThis.myDebounce) {
  globalThis.myDebounce = function (func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
}

// Throttle function
if (!globalThis.myThrottle) {
  globalThis.myThrottle = function (func, limit) {
    let inThrottle;

    return function (...args) {
      const context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;

        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };
}

// ============================================
// TESTING THE POLYFILLS
// ============================================

console.log("✅ All polyfills loaded successfully!\n");

// Test Array methods
console.log("=== ARRAY METHODS TESTS ===");
const nums = [1, 2, 3, 4, 5];

console.log("Original array:", nums);
console.log(
  "myMap (x * 2):",
  nums.myMap((x) => x * 2),
);
console.log(
  "myFilter (x > 2):",
  nums.myFilter((x) => x > 2),
);
console.log(
  "myReduce (sum):",
  nums.myReduce((acc, x) => acc + x, 0),
);
console.log(
  "myFind (x > 3):",
  nums.myFind((x) => x > 3),
);
console.log(
  "myFindIndex (x > 3):",
  nums.myFindIndex((x) => x > 3),
);
console.log(
  "mySome (x > 4):",
  nums.mySome((x) => x > 4),
);
console.log(
  "myEvery (x > 0):",
  nums.myEvery((x) => x > 0),
);
console.log("myIncludes (3):", nums.myIncludes(3));
console.log(
  "myFlat:",
  [
    [1, 2],
    [3, [4, 5]],
  ].myFlat(2),
);

console.log("\n=== STRING METHODS TESTS ===");
const str = "Hello World";
console.log("Original string:", str);
console.log('myIncludes ("World"):', str.myIncludes("World"));
console.log('myStartsWith ("Hello"):', str.myStartsWith("Hello"));
console.log('myEndsWith ("World"):', str.myEndsWith("World"));
console.log("myRepeat (3):", "abc".myRepeat(3));
console.log("myTrim:", "  hello  ".myTrim());
console.log("myPadStart:", "5".myPadStart(3, "0"));
console.log("myPadEnd:", "5".myPadEnd(3, "0"));

console.log("\n=== OBJECT METHODS TESTS ===");
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
console.log("Object.myAssign:", Object.myAssign({}, obj1, obj2));
console.log("Object.myKeys:", Object.myKeys(obj1));
console.log("Object.myValues:", Object.myValues(obj1));
console.log("Object.myEntries:", Object.myEntries(obj1));

console.log("\n=== FUNCTION METHODS TESTS ===");
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}
const person = { name: "Alice" };
console.log("myCall:", greet.myCall(person, "Hello", "!"));
console.log("myApply:", greet.myApply(person, ["Hi", "?"]));
const boundGreet = greet.myBind(person, "Hey");
console.log("myBind:", boundGreet("!!!"));

console.log("\n=== PROMISE TESTS ===");
const p1 = MyPromise.resolve(42);
p1.then((value) => console.log("MyPromise resolved:", value));

const p2 = new MyPromise((resolve) => {
  setTimeout(() => resolve("Async result"), 100);
});
p2.then((value) => console.log("MyPromise async:", value));

MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  MyPromise.resolve(3),
]).then((values) => console.log("MyPromise.all:", values));

console.log("\n=== UTILITY TESTS ===");
console.log("Array.myFrom:", Array.myFrom("hello"));
console.log("Array.myIsArray:", Array.myIsArray([1, 2, 3]));
console.log(
  "JSON.myStringify:",
  JSON.myStringify({ name: "Bob", age: 30, items: [1, 2, 3] }),
);

console.log("\n=== DEBOUNCE/THROTTLE TESTS ===");
let debounceCount = 0;
const debouncedFn = myDebounce(() => {
  console.log("Debounced function called!", ++debounceCount);
}, 500);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  debouncedFn();
}

let throttleCount = 0;
const throttledFn = myThrottle(() => {
  console.log("Throttled function called!", ++throttleCount);
}, 500);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  throttledFn();
}

console.log("\n✨ All tests completed! Check the results above.");
