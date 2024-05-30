import express from "express";
import parseFormMultipart from "../middlewares/parseRegisterFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import { createEvent, findEventyId, getAllEventsPagination } from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseFormMultipart,
  eventCreationValidationMiddleware,
  createEvent
);
router.get("/page", checkAuthorization, getEventsPagination);
router.get("/:id", checkAuthorization, findEventyId);

export default router;
