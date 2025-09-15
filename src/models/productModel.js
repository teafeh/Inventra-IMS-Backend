import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a product name"],},
    category: { type: String, required: true,},
    quantity: { type: Number, required: true, default: 0, },
    price: { type: Number, required: true,
    },
    supplier: { type: String, },
  },
  { timestamps: true, }
);

// 👇 force mongoose to use a custom collection name
export default  mongoose.model("Product", productSchema, "ims_products");
