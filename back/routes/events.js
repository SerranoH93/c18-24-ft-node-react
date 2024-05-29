import express from "express";
import parseFormMultipart from "../middlewares/parseRegisterFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import { createEvent } from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseFormMultipart,
  eventCreationValidationMiddleware,
  createEvent
);

export default router;
