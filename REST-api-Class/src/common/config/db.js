import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  //what is inside this connection object? we can see the host, port, name of the database, etc

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;
