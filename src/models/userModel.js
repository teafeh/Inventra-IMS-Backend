// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // link user to a company
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    phone: { type: String },
    dob: { type: Date }, // user profile update
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    role: { type: String, enum: ["Admin", "Staff"], default: "Staff" }, // control permissions
    profilePicture: { type: String }, // URL to uploaded picture
    position: { type: String }, // e.g. "Software Engineer"
    department: { type: String }, // e.g. "IT", "HR"
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 👇 force collection name to "ims_user"
const UserModel = mongoose.model("User", userSchema, "ims_user");

export default UserModel;
