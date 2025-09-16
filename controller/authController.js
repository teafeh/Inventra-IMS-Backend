import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CompanyModel from "../models/companyModels.js";
import UserModel from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Try user login first
    let account = await UserModel.findOne({ email });
    let role = "user";

    if (!account) {
      // 2. If not user, try company
      account = await CompanyModel.findOne({ email });
      role = "company";
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate token
    const payload =
      role === "user"
        ? { id: account._id, role: account.role, company: account.company }
        : { id: account._id, role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // 5. Return response
    res.json({ token, account, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existing = await CompanyModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Company already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await CompanyModel.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Company registered", company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

