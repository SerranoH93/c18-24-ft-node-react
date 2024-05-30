import express from "express";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import eventCreationValidationMiddleware from "../middlewares/eventCreationValidationMiddleware.js";
import { createEvent } from "../controllers/eventsController.js";

const router = express.Router();

router.post(
  "/create",
  parseMultipartForm,
  eventCreationValidationMiddleware,
  createEvent
);

export default router;
