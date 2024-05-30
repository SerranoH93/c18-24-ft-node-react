import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import { createEvent, findEventyId, getAllEventsPagination } from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseMultipartForm,
  eventCreationValidationMiddleware,
  createEvent
);
router.get("/page", checkAuthorization, getEventsPagination);
router.get("/:id", checkAuthorization, findEventyId);

export default router;
