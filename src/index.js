import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes for handling category-related requests
app.use("/api/categories", categoryRoutes);

// Routes for handling subcategory-related requests
app.use("/api/subcategories", subcategoryRoutes);

// Routes for handling item-related requests
app.use("/api/items", itemRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
