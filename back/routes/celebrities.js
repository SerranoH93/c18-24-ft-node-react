import express from "express";
import parseFormMultipart from "../middlewares/parseRegisterFormMiddleware.js";
import celebrityCreationValidation from "../middlewares/celebrityCreationValidationMiddleware.js";
import { createCelebrity } from "../controllers/celebritiesController.js";

const router = express.Router();

router.post(
  "/create",
  parseFormMultipart,
  celebrityCreationValidation,
  createCelebrity
);

export default router;
