import express from "express";
import {
  createInventoryItem,
  getAllInventory,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  stockIn,
  stockOut
} from "../controller/inventoryController.js";

import { authCompany, authUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Staff/Admin can manage inventory
router.post("/", authUser, createInventoryItem);
router.put("/:id", authUser, updateInventoryItem);
router.delete("/:id", authUser, deleteInventoryItem);
router.post("/:id/in", authUser, stockIn);
router.post("/:id/out", authUser, stockOut);


// Company can only view inventory
router.get("/", authCompany, getAllInventory);
router.get("/:id", authCompany, getInventoryItem);
 
export default router;
