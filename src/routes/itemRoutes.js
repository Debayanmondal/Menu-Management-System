import express from "express";
import {
  createItem,
  getAllItems,
  getItemByIdOrName,
  updateItem,
} from "../controllers/itemController.js";

const router = express.Router();

// Route to create a new item
router.post("/", createItem);

// Route to get all items
router.get("/", getAllItems);

// Route to get an item by ID
router.get("/:id", getItemByIdOrName);

// Route to get all items under a specific category
router.get("/category/:categoryId", getAllItems);

// Route to get all items under a specific subcategory
router.get("/subcategory/:subcategoryId", getAllItems);

// Route to search for an item by name
router.get("/name/:name", getItemByIdOrName);

// Route to update an item by ID
router.put("/:id", updateItem);

export default router;
