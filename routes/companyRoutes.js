import express from "express";
import { updateCompany, getAllStaff, getStaffActivity, createUser, getReports, getCompanyDetails } from "../controller/companyController.js";
import { authCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user", authCompany, createUser); // only logged-in company can create staff
router.get("/reports", authCompany, getReports);
router.get("/staff", authCompany, getAllStaff);
router.get("/staff/:staffId/activity", authCompany, getStaffActivity);
router.put("/me", authCompany, updateCompany);
router.get("/me", authCompany, getCompanyDetails);

export default router;
