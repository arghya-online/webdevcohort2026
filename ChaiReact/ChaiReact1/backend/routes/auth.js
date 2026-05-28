import { Router } from "express";
import bcrypt from "bcryptjs";
import { User, RefreshToken } from "../db.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password required" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    const payload = { id: newUser._id, email: newUser.email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshToken.create({ user_id: newUser._id, token: refreshToken });

    res.status(201).json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id, email: user.email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshToken.create({ user_id: user._id, token: refreshToken });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken)
      return res.status(400).json({ message: "refreshToken required" });

    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored)
      return res.status(401).json({ message: "Refresh token revoked" });

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const payload = { id: decoded.id, email: decoded.email };
      const accessToken = signAccessToken(payload);
      const newRefreshToken = signRefreshToken(payload);

      await RefreshToken.deleteOne({ token: refreshToken });
      await RefreshToken.create({
        user_id: payload.id,
        token: newRefreshToken,
      });

      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Token refresh failed" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
});

export default router;
