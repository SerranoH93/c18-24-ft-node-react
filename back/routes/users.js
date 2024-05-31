import express from "express";
import checkAuthorization from "../middlewares/authorizationMiddleware.js";
import {
  getAllUsers,
  getAllUsersPaginated,
  retrieveUserById,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", checkAuthorization, getAllUsers);
router.get("/page", checkAuthorization, getAllUsersPaginated);
router.get("/:id", checkAuthorization, retrieveUserById);

export default router;
