import express from "express";
import {
  registerUserEvent,
  getAllUserEvents,
} from "../controllers/users_eventsController.js";

const router = express.Router();

router.post("/register", registerUserEvent);
router.get("/:user_id", getAllUserEvents);

export default router;
