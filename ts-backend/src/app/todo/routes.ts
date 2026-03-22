import { Router } from "express";

import TodoController from "./controller.js";

const router = Router();
const Controller = new TodoController();

router.get("/");
router.get("/:id");

router.post("/");

router.put("/:id");
router.delete("/:id");

export default router;
