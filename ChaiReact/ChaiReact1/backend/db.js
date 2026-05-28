import mongoose from "mongoose";

// Connect to MongoDB
export async function connectDB() {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/chai-auth";
    console.log("🔄 Attempting MongoDB connection...");
    console.log("📍 MongoDB URI:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("✓ MongoDB connected successfully!");
    console.log("✓ Database ready for operations");
  } catch (error) {
    console.error("✗ MongoDB connection failed!");
    console.error("❌ Error:", error.message);
    console.error(
      "💡 Make sure MongoDB is running on",
      process.env.MONGO_URI || "mongodb://localhost:27017",
    );
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// RefreshToken Schema
const refreshTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default { User, RefreshToken };
