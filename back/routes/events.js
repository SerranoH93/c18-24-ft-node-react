import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import eventValidationMiddleware from "../middlewares/eventValidationMiddleware.js";
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
  eventValidationMiddleware,
  createEvent
);
router.get("/", getAllEvents);
router.get("/page", getAllEventsPaginated);
router.get("/retrieve", retrieveEventByUUID);
router.put(
  "/update/:event_uuid",
  parseMultipartForm,
  eventValidationMiddleware,
  updateEventByUUID
);
router.get("/close/:event_uuid", closeEvent);

export default router;
