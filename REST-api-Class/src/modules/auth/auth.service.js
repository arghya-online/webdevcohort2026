import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateAccessToken, generateRefreshToken } from "./auth.utils.js";
import { hash, compare } from "bcryptjs";
import { generateResetToken } from "../../common/utils/jwt-utils.js";

const hashToken = (token) => hash(token, 10);

const register = async ({ name, email, password, role }) => {
  // Here you would typically interact with your database to create a new user
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("Email already in use");

  const { rawToken, hashedToken } = User.generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verficationToken: hashedToken,
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

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid)
    throw ApiError.unauthorized("Invalid email or password");

  if (!user.isVerified)
    throw ApiError.unauthorized("Please verify your email before logging in");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = hashToken(generateRefreshToken({ id: user._id }));

  user.refreshToken = hashToken(refreshToken);
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

//TODO: Implement refresh token logic
const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("No token provided");

  const decoded = verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("User Not found");

  if (user.refreshToken !== hashToken(token)) {
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

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 3600000;
  await user.save();

  //TODO: Send password reset email with rawToken
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw ApiError.unauthorized("Invalid or expired token");

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
};

export { register, login, refresh, logout, forgotPassword, resetPassword };
