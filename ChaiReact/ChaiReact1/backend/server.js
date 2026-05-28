import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
console.log("Starting backend server...");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
      console.log(`API ready - MongoDB is connected and running!`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
