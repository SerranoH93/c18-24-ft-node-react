import express from "express";
import loginValidation from "../middlewares/loginValidationMiddleware.js";
import parseMultipartForm from "../middlewares/parseMultipartFormMiddleware.js";
import userRegisterValidation from "../middlewares/userRegisterValidationMiddleware.js";
import { login, register } from "../controllers/authenticationController.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/register", parseMultipartForm, userRegisterValidation, register);

export default router;
