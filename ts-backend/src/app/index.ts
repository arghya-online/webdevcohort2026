import express from "express";
import type { Application } from "express";

export function createServerApplication(): Application {
  const app = express();
  //#region //*===============Routes==================
  app.get("/", (req, res) => {
    res.json({ message: "Hello Arghya" });
  });

  app.get("/hello", (req, res) => {
    res.json({ message: "Bye" });
  });
  //#endregion //*===============Routes==================

  return app;
}
