import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number },
    supplier: { type: String },
    logs: [
      {
        action: { type: String, enum: ["IN", "OUT"], required: true },
        quantity: { type: Number, required: true },
        staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema, "ims_inventory");
