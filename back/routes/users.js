import express from "express";
import checkAuthorization from "../middlewares/authorizationMiddleware.js";
import { getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", checkAuthorization, getAllUsers);

export default router;
