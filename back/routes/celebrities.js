import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import celebrityCreationValidation from "../middlewares/celebrityCreationValidationMiddleware.js";
import { createCelebrity } from "../controllers/celebritiesController.js";

const router = express.Router();

router.post(
  "/create",
  parseMultipartForm,
  celebrityCreationValidation,
  createCelebrity
);

export default router;
