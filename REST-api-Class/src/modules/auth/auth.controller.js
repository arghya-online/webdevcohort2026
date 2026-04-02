import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  const user = await authService.register(req.body, res);
  ApiResponse.created(res, "Registration successful", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  ApiResponse.ok(res, "Login successful", { user, accessToken, refreshToken });
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);
  res.clearCookie("refreshToken"); // Clear the refresh token cookie on logout
  ApiResponse.ok(res, "Logout successful");
};
const getProfile = async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  ApiResponse.ok(res, "User profile retrieved successfully", user);
};
const emailVerification = async (req, res) => {
  const { token } = req.query;
  await authService.verifyEmail(token);
  ApiResponse.ok(res, "Email verified successfully");
};

export { register, login, logout, getProfile, emailVerification };
