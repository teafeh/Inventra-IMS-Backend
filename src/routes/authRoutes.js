import express from "express";
import { login, registerCompany } from "../controller/authController.js";


const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", login);


export default router;
