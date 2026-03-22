const express = require("express");

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();

    app.use(express.json()); //
    app.get("/menu", (req, res) => {
      res.json({
        menu: [
          { name: "Pizza", price: 10 },
          { name: "Burger", price: 8 },
          { name: "Salad", price: 6 },
        ],
      });
    });

    app.get("/search", (req, res) => {
      const { q, limit } = req.query;
      res.json({
        query: q,
        limit: limit || "10",
      });
    });

    app.get("/menu/:id", (req, res) => {
      const { id } = req.params;
      res.json({
        item: id,
        price: 10,
      });
    });

    app.post("/order", (req, res) => {
      const order = req.body;
      res.status(201).json({
        status: "created",
        order,
      });
    });

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`; // better with http

      console.log(`Server is running on port ${PORT}`);
      resolve();

      try {
        const menuRes = await fetch(`${base}/menu`);
        const menuData = await menuRes.json(); // ✅
        console.log("GET /menu", JSON.stringify(menuData));

        const searchRes = await fetch(`${base}/search?q=pizza&limit=5`);
        const searchData = await searchRes.json(); // ✅
        console.log("GET /search", JSON.stringify(searchData));

        const menuItemRes = await fetch(`${base}/menu/1`);
        const menuItemData = await menuItemRes.json();
        console.log("GET /menu/1", JSON.stringify(menuItemData));

        const orderRes = await fetch(`${base}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: "Pizza",
            quantity: 2,
          }),
        });

        const orderData = await orderRes.json();
        console.log("POST /order", JSON.stringify(orderData));
      } catch (error) {
        console.error("Error:", error);
      }

      server.close(() => {
        console.log("Block 1 Served");
        resolve();
      });
    });
  });
}

async function block_2_response() {
  return new Promise((resolve) => {
    const app = express();

    app.get("/text", (req, res) => {
      res.send("Hello, World!");
    });

    app.get("/json", (req, res) => {
      res.json({
        framework: "express",
        version: "6.1.1",
      });
    });

    app.get("/not-found", (req, res) => {
      res.status(404).json({
        error: "Not Found",
      });
    });

    app.get("health", (req, res) => {
      res.sendStatus(200);
    });

    app.get("/old-menu", (req, res) => {
      //add entry in db to see how many users are still visiting old route

      res.redirect(301, "/new-menu");
    });

    app.get("xml", (req, res) => {
      res
        .type("application/xml")
        .send(
          '<menu><item name="Pizza" price="10"/><item name="Burger" price="8"/><item name="Salad" price="6"/></menu>',
        );
    });

    app.get("/custom-headers", (req, res) => {
      res.set("X-powered-by", "Express");
      res.set("X-Request-Id", req.headers["x-request-id"]);
      res.json({ message: "Custom headers set" });
    });

    app.get("/no-content", (req, res) => {
      res.status(204).end();
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.1:${port}`;

      try {
        //Todo: add fetch calls to test all routes and log responses
      } catch (error) {
        logger.error("Error:", error);
      }
    });
  });
}

async function main() {
  await block_1_basicServer();
  await block_2_response();
  process.exit(0);
}
