import express from "express";
import parseFormMultipart from "../middlewares/parseRegisterFormMiddleware.js";
import celebrityCreationValidation from "../middlewares/celebrityCreationValidationMiddleware.js";
import { createCelebrity, getAllCelebrities} from "../controllers/celebritiesController.js";

const router = express.Router();

router.post(
  "/create",
  parseFormMultipart,
  celebrityCreationValidation,
  createCelebrity
);
router.get("/", getAllCelebrities);
router.get("/:id", getAllCelebrities);

export default router;
