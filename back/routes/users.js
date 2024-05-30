import express from "express";
import checkAuthorization from "../middlewares/authorizationMiddleware.js";
import { getAllUsersPagination, findUseryId, getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/page", checkAuthorization, getAllUsersPagination);
router.get("/:id", checkAuthorization, findUseryId);
router.get("/", checkAuthorization, getAllUsers);

export default router;
