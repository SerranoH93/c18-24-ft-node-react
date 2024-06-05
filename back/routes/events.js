import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import {
  eventCreationValidationMiddleware,
  eventUpdateValidationMiddleware,
} from "../middlewares/eventValidationMiddleware.js";
import {
  createEvent,
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
router.get("/page", getAllEventsPaginated);
router.get("/:uuid", retrieveEventByUUID);
router.patch(
  "/:uuid",
  parseMultipartForm,
  eventUpdateValidationMiddleware,
  updateEventByUUID
);

export default router;
