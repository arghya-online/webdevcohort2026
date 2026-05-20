import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();
await connectDB();

const app = express();

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Access the health endpoint at http://localhost:3000/health");
});
