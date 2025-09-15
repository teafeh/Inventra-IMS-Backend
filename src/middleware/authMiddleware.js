import jwt from "jsonwebtoken";
import CompanyModel from "../models/companyModels.js";
import UserModel from "../models/userModel.js";


// VERIFY COMPANY TOKEN
export const authCompany = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await CompanyModel.findById(decoded.id);
    if (!company) return res.status(401).json({ message: "Unauthorized" });

    req.company = company;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// VERIFY STAFF TOKEN
export const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await UserModel.findById(decoded.id);
    
    if (!user) return res.status(401).json({ message: "Unauthorized" });



    req.user = user;
    console.log(req.user);
console.log(user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
