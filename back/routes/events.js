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
router.get("/:uuid", retrieveEventByUUID);
router.put(
  "/:uuid",
  parseMultipartForm,
  eventUpdateValidationMiddleware,
  updateEventByUUID
);

export default router;
