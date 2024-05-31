import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import {
  createEvent,
  getAllEventsPaginated,
  retrieveEventByUUID,
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

export default router;
