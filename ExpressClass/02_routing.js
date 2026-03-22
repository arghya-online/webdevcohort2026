const express = require("express");

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const routes = {
      1: {
        id: 1,
        name: "UttarBanga Express",
        direction: "Bamanhat to Sealdah",
      },
      2: {
        id: 2,
        name: "Darjeeling Mail",
        direction: "New Jalpaiguri to Sealdah",
      },
      3: {
        id: 3,
        name: "Padatik Express",
        direction: "New Jalpaiguri to Sealdah",
      },
    };

    let nextid = 3;

    // list all routes
    app.get("/routes", (req, res) => {
      res.json(Object.values(routes));
    });

    // single route by id
    app.get("/routes/:id", (req, res) => {
      const { id } = req.params;
      const route = routes[id];
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      res.json(route);
    });

    app.post("/routes", (req, res) => {
      const newRoute = { id: nextid++, ...req.body };
      routes[newRoute.id] = newRoute;
      res.status(201).json(newRoute);
    });

    app.put("/routes/:id", (req, res) => {
      const id = req.params.id;
      if (!routes[id]) {
        return res.status(404).json({ error: "Route not found" });
      }
      routes[id] = { ...routes[id], ...req.body };
      res.json(routes[id]);
    });

    app.patch("/routes/:id", (req, res) => {
      const id = req.params.id;
      if (!routes[id]) {
        return res.status(404).json({ error: "Route not found" });
      }
      routes[id] = { ...routes[id], ...req.body };
      res.json(routes[id]);
    });

    app.delete("/routes/:id", (req, res) => {
      const id = req.params.id;
      if (!routes[id]) {
        return res.status(404).json({ error: "Route not found" });
      }
      delete routes[id];
      res.json({ message: "Route deleted" });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();
        console.log("GET /routes", JSON.stringify(listData));

        const createRes = await fetch(`${base}/routes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Kanchan Kanya Express",
            direction: "Sealdah to Alipurduar",
          }),
        });
        const createData = await createRes.json();
        console.log("POST /routes", JSON.stringify(createData));

        const updateRes = await fetch(`${base}/routes/${createData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Kanchan Kanya Express Updated",
            direction: "Alipurduar to Sealdah",
          }),
        });
        const updateData = await updateRes.json();
        console.log("PUT /routes/:id", JSON.stringify(updateData));
      } catch (error) {
        console.log(error);
      }

      server.close(() => {
        console.log("Block 1 Done");
        resolve();
      });
    });
  });
}

function block_2_routeChaining() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    // wildcard path: /files/docs/readme.txt
    app.get("/files/*filepath", (req, res) => {
      const filepath = req.params.filepath;
      res.json({ filepath, type: "wildcard" });
    });

    // route chaining on the same path
    app
      .route("/schedule")
      .get((req, res) => {
        res.json({ method: "GET", path: "/schedule" });
      })
      .post((req, res) => {
        res.json({ method: "POST", path: "/schedule" });
      })
      .put((req, res) => {
        res.json({ method: "PUT", path: "/schedule" });
      })
      .delete((req, res) => {
        res.json({ method: "DELETE", path: "/schedule" });
      });

    // prefix middleware match
    app.use("/api", (req, res) => {
      res.json({ path: req.path });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const filesRes = await fetch(`${base}/files/docs/readme.txt`);
        const filesData = await filesRes.json();
        console.log("GET /files/*filepath", JSON.stringify(filesData));

        const scheduleRes = await fetch(`${base}/schedule`);
        const scheduleData = await scheduleRes.json();
        console.log("GET /schedule", JSON.stringify(scheduleData));
      } catch (error) {
        console.log(error);
      }

      server.close(() => {
        console.log("Block 2 Done");
        resolve();
      });
    });
  });
}

async function main() {
  await block_1_httpMethods();
  await block_2_routeChaining();
  process.exit(0);
}

main();
