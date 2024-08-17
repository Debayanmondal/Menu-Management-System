import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Route to create a new category
router.post("/", createCategory);

// Route to get all categories
router.get("/", getAllCategories);

// Route to get a category by ID
router.get("/:id", getCategoryByIdOrName);

// Route to get a category by name
router.get("/name/:name", getCategoryByIdOrName);

// Route to update a category by ID
router.put("/:id", updateCategory);

export default router;
