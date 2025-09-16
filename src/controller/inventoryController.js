import Inventory from "../models/inventorymodel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";


// CREATE NEW ITEM
export const createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, price, supplier } = req.body;
    const userId = req.user._id;

    const item = await Inventory.create({
      company: userId,
      name,
      category,
      quantity,
      price,
      supplier,
      logs: [],
    });

    res.status(201).json({ message: "Inventory item created", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllInventoryUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const inventory = await Inventory.find({ company: userId }).populate("logs.staff", "name email");
    res.status(200).json({ inventory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL INVENTORY ITEMS FOR COMPANY
export const getAllInventory = async (req, res) => {
  try {
    const companyId = req.company._id;
    const inventory = await Inventory.find({ company: companyId }).populate("logs.staff", "name email");
    res.status(200).json({ inventory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE ITEM
export const getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate("logs.staff", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ITEM DETAILS
export const updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Inventory item updated", item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ITEM
export const deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD STOCK (IN)
export const stockIn = async (req, res) => {
  try {
    const { quantity } = req.body;
    const staffId = req.user._id;

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += quantity;
    item.logs.push({ action: "IN", quantity, staff: new mongoose.Types.ObjectId(staffId) });
    await item.save();

    // Optional: trigger notification here

    res.status(200).json({ message: "Stock added", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE STOCK (OUT)
export const stockOut = async (req, res) => {
  try {
    const { quantity } = req.body;
    const staffId = req.user._id;

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    item.quantity -= quantity;
    item.logs.push({ action: "OUT", quantity, staff: new mongoose.Types.ObjectId(staffId) });
    await item.save();

    // Optional: trigger notification here

    res.status(200).json({ message: "Stock removed", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
