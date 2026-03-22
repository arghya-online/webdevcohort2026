const express = require("express");

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json({ limit: "50kb" }));
    // built in middleware to parse json body, we can also set a limit to the size of the body

    app.use(express.urlencoded({ extended: true }));
    // built in middleware to parse urlencoded body, extended: true allows to parse nested objects

    app.use(
      express.static(ShadowRoot, {
        dotfiles: "ignore",
        maxAge: 0,
      }),
    );
    //todo: static, and options under it eg public, maxAge, index, redirect, etc

    //request logger middleware
    // next is a callback to move to the next middleware or route handler
    app.use((req, res, next) => {
      //add a db
      //console log everything
      // write in some file

      const logEntry = `${req.method} : ${req.url} `;
      localStorage.push(logEntry);
      console.log(`[LOG] -- ${logEntry}`);
      // [LOG] is a prefix to easily identify log messages in the console
      next(); // move to the next middleware or route handler

      //this is winston i.e. a production grade logger
    });

    app.use((req, res, next) => {
      req.startTime = Date.now(); // add a custom property to the request object to track when the request started

      res.on("finish", () => {
        const duration = Date.now() - req.startTime; // calculate how long the request took to process

        console.log(`[TIMER] - ${req.method} - ${req.url} took ${duration} ms`);
      });
      next();
    });

    // auth middleware -- custom middleware to check for authentication
    function authMe(req, res, next) {
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({ error: "No token, please login" });
      }

      if (token !== "secret-token") {
        return res.status(403).json({ error: "Invalid token, access denied" });
      }
      //token -> extract data from token -> userID, email

      req.user = {
        id: 1,
        name: "Arghya",
        role: "admin",
      };
      next();
    }

    function getRole(role) {
      return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
          return res.status(403).json({ error: `Role ${role} required` });
        }
        next();
      };
    }

    //next is a callback to move to the next middleware or route handler, its position is important, if we put it before authMe then it will not work as expected

    function rateLimit(maxRequest) {
      let count = 0;

      return (req, res, next) => {
        count++;
        if (count > maxRequest) {
          return res
            .status(429)
            .json({ error: "Rate limit exceeded. Try after some time." });
        }
        setTimeout(() => {
          count--;
        }, 60000); // reset count after 1 minute
        next();
      };
    }

    const limitedEndPoint = rateLimit(3);

    app.get("/limited", limitedEndPoint, (req, res, next) => {
      res.json({
        message: "This endpoint is rate limited to 3 requests per minute.",
      });

      next();
    });

    app.get("/profile", authMe, getRole("admin"), () => {});
    app.get("/profile", authMe, getRole("teacher"), () => {});
    app.get("/profile", authMe, getRole("student"), () => {});
    app.get("/profile", authMe, getRole(["admin"]), () => {});
    app.get(
      "/profile",
      authMe,
      getRole(["admin", "teacher", "student"]),
      () => {},
    );

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();

        const createRes = await fetch(`${base}/routes`);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

async function main() {
  await block_1_basicServer();
  await block_2_response();

  process.exit(0);
}

main();
