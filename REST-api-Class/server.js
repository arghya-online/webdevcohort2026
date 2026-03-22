import "dotenv/config";
import app from "./src/app.js";
import { connect } from "mongoose";
import connectDB from "./src/common/config/db.js";

const start = async () => {
  //connect to db
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is runnin at ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
