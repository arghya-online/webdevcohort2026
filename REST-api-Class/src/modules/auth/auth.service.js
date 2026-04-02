import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { createHash } from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateResetToken,
} from "../../common/utils/jwt-utils.js";
import { hash, compare } from "bcryptjs";

const register = async ({ name, email, password, role }) => {
  // Here you would typically interact with your database to create a new user
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("Email already in use");

  const { hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  //TODO: Send verification email with rawToken

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

const login = async ({ email, password }) => {
  //take email and find user in db
  //then check if password matches
  //if matches, generate a JWT token and return it

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  if (!user.isVerified)
    throw ApiError.unauthorized("Please verify your email before logging in");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = await hash(refreshToken, 10);
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

//TODO: Implement refresh token logic
const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("No token provided");

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("User Not found");

  const isValid = await compare(token, user.refreshToken || "");
  if (!isValid) {
    throw ApiError.unauthorized("Invalid token");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  return { accessToken };
};

const logout = async (userId) => {
  // const user = await User.findById(userId);
  // if (!user) throw ApiError.unauthorized("User Not found");

  // user.refreshToken = undefined;
  // await user.save({ validateBeforeSave: false });

  await User.findByIdAndUpdate(
    userId,
    { refreshToken: undefined },
    { new: true },
  );
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound("User not found with this email");

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  //TODO: Send password reset email with rawToken
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) throw ApiError.unauthorized("Invalid or expired token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

const verifyEmail = async (token) => {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ verificationToken: hashedToken }).select(
    "+verificationToken",
  );
  if (!user) throw ApiError.unauthorized("Invalid verification token");

  //if user is not found,
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return user;
};
// - this function takes a verification token, hashes it, and looks for a user with that hashed token in the database.
export {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  verifyEmail,
};
