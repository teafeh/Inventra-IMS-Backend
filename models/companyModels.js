import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // company name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    phone: { type: String },
    industry: { type: String }, // e.g. Tech, Logistics, Healthcare
    website: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    logo: { type: String }, // URL to logo file
    description: { type: String }, // about the company
    registrationNumber: { type: String }, // optional govt reg no.
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 👇 this will be stored in "ims_company" collection
const CompanyModel = mongoose.model("Company", companySchema, "ims_company");

export default CompanyModel;
