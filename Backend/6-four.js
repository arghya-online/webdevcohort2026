import fs from "fs";
import crypto from "crypto";

setTimeout(() => console.log("Hello from Timer"), 0);
setImmediate(() => console.log("Hello from Immediate"), 0);

fs.readFile("sample.txt", "utf-8", function (err, data) {
  console.log(`File Reading `);
});
