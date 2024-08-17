import Category from "../models/categoryModel.js";
import asyncHandler from "../utils/errorHandler.js";

// Controller to create a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description, taxApplicability, tax, taxType } = req.body;

  // Create a new category document
  const category = new Category({
    name,
    image,
    description,
    taxApplicability,
    tax,
    taxType,
  });
  await category.save();

  // Respond with the created category
  res.status(201).json(category);
});

// Controller to get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
  // Fetch all categories and populate their subcategories
  const categories = await Category.find().populate("subcategories");
  res.status(200).json(categories);
});

// Controller to get a category by ID or name
export const getCategoryByIdOrName = asyncHandler(async (req, res) => {
  const { id, name } = req.params;
  const query = id ? { _id: id } : { name };
  const category = await Category.findOne(query).populate("subcategories");

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.status(200).json(category);
  }
});

// Controller to update a category
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find the category by ID and update it with the provided data
  const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedCategory) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.status(200).json(updatedCategory);
  }
});
