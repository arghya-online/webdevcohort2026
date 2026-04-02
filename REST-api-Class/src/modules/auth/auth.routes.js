import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);

//validate middleware will validate the request body against the RegisterDto schema before calling the controller.register function

router.post("/login", validate(LoginDto), controller.login);
router.get("/profile", authenticate, controller.getProfile); //("route", middleware, controller function)
router.get("/verify-email", controller.emailVerification);
router.post("/logout", authenticate, controller.logout);
router.get("/verify-email/:token", controller.emailVerification);
router.post(
  "/forgot-password",
  validate(forgotPasswordDto),
  controller.forgotPassword,
);
router.post(
  "/reset-password/:token",
  validate(resetPasswordDto),
  controller.resetPassword,
);

export default router;
