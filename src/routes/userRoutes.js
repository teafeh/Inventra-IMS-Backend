import express from "express";
import { getStaffDetails, updateUser} from "../controller/userController.js";
import { authUser } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/me", authUser, getStaffDetails);
router.put("/me", authUser, updateUser);

export default router;
