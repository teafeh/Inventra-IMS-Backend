import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Backend is running ;)");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
