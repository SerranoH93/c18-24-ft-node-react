import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import checkAuthorization from "../middlewares/authorizationMiddleware.js";
import {
  createEvent,
  getAllEventsPaginated,
  findEventyId,
} from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseMultipartForm,
  eventCreationValidationMiddleware,
  createEvent
);
router.get("/page", checkAuthorization, getAllEventsPaginated);
router.get("/:id", checkAuthorization, findEventyId);

export default router;
