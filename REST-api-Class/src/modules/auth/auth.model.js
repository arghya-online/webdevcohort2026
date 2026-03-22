import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is Required"],
    minlength: 50,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Email is Required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verificationToken: {
    type: String,
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
