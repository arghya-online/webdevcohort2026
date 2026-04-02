import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

//middleware
app.use(express.json()); //middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //middleware to parse cookies

//routes

app.use("/api/auth", authRoutes);

export default app;
