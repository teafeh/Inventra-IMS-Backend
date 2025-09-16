import mongoose from "mongoose";
import CompanyModel from "../models/companyModels.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import Inventory from "../models/inventoryModel.js";





// CREATE STAFF (USER)
export const createUser = async (req, res) => {
  try {
    const {firstName, lastName, email, password, role } = req.body;
    const companyId = req.company.id; // from middleware

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ firstName,
  lastName, email, password: hashedPassword, role, company: companyId });

    res.status(201).json({ message: "Staff created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL STAFF
export const getAllStaff = async (req, res) => {
  try {
    const companyId = req.company.id; // from auth middleware
    const staff = await UserModel.find({ company: companyId }).select("-password");

    res.status(200).json({ staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE STAFF + ACTIVITY

export const getStaffActivity = async (req, res) => {
  try {
    const { staffId } = req.params;
    const companyId = req.company.id; // from middleware

    // Confirm staff belongs to this company
    const staff = await UserModel.findOne({ _id: staffId, company: companyId }).select("-password");
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    // Find all inventory items where this staff has logs
    const inventories = await Inventory.find({
      company: companyId,
      "logs.staff": new mongoose.Types.ObjectId(staffId)
    }).lean();

    // Extract only this staff’s logs
    const activity = inventories.flatMap(item =>
      item.logs
        .filter(logs => logs.staff.toString() === staffId)
        .map(logs => ({
          inventoryId: item._id,
          inventoryName: item.name,
          action: logs.action,
          quantity: logs.quantity,
          date: logs.date,
        }))
        
        
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ staff, activity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// GET COMPANY REPORT (all inventory logs for this company)
export const getReports = async (req, res) => {
  try {
    const companyId = req.company.id;
    const inventory = await Inventory.find({ company: companyId });
    res.json({ inventory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompanyDetails = async (req, res) => {
  try {
    const companyId = req.company.id; // from auth middleware

    // Fetch company info
    const company = await CompanyModel.findById(companyId).select("-password"); // hide password

    if (!company) return res.status(404).json({ message: "Company not found" });

    // Fetch all staff linked to this company
    const staff = await UserModel.find({ company: companyId }).select("-password");

    res.status(200).json({ company, staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCompany = async (req, res) => {
  try {
    const { name, address, phone, email, website, industry, description, logo, size, foundedYear } = req.body;

    const company = await CompanyModel.findByIdAndUpdate(
      req.company.id,
      { name, address, phone, email, website, industry, description, logo, size, foundedYear },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Company profile updated", company });
  } catch (err) {
    res.status(500).json({ message: "Error updating company", error: err.message });
  }
};