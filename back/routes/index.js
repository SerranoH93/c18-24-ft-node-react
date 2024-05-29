import express from "express";
import authentication from "./authentication.js";
import users from "./users.js";
import celebrities from "./celebrities.js";
import events from "./events.js";

const router = express.Router();

router.use("/api/authentication", authentication);
router.use("/api/users", users);
router.use("/api/celebrities", celebrities);
router.use("/api/events", events);

export default router;
