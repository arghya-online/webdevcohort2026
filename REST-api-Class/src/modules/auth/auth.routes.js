import { Router } from "express";
import * as controller from "./auth.controller.js";
import { validate } from "../../utils/validation.js";
import RegisterDto from "./dto/register.dto.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register); //validate middleware will validate the request body against the RegisterDto schema before calling the controller.register function

export default router;
