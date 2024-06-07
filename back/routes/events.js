import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import {
  eventCreationValidationMiddleware,
  eventUpdateValidationMiddleware,
} from "../middlewares/eventValidationMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getAllEventsPaginated,
  retrieveEventByUUID,
  updateEventByUUID,
  closeEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseMultipartForm,
  eventCreationValidationMiddleware,
  createEvent
);
router.get("/", getAllEvents);
router.get("/page", getAllEventsPaginated);
router.get("/retrieve", retrieveEventByUUID);
router.put(
  "/:event_uuid",
  parseMultipartForm,
  eventUpdateValidationMiddleware,
  updateEventByUUID
);
router.get("/close/:event_uuid", closeEvent);

export default router;
