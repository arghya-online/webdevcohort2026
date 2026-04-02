import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is Required"],
    minlength: 2,
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
    select: false,
  },
  refreshToken: {
    type: String,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);

  //"12" is the salt value, which determines the computational cost of hashing the password.
});

userSchema.methods.comparePassword = async function (clearTextPassword) {
  return bcrypt.compare(clearTextPassword, this.password);
};

export default mongoose.model("User", userSchema);
