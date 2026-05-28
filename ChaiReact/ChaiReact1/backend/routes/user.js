import { Router } from "express";
import { User } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "id name email createdAt",
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

export default router;
