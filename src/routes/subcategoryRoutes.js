import express from "express";
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryByIdOrName,
  updateSubCategory,
} from "../controllers/subcategoryController.js";

const router = express.Router();

// Route to create a new subcategory
router.post("/", createSubCategory);

// Route to get all subcategories
router.get("/", getAllSubCategories);

// Route to get a subcategory by ID
router.get("/:id", getSubCategoryByIdOrName);

// Route to get all subcategories under a specific category
router.get("/category/:categoryId", getAllSubCategories);

// Route to update a subcategory by ID
router.put("/:id", updateSubCategory);

export default router;
