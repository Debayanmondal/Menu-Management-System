import SubCategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "../utils/errorHandler.js";

// Controller to create a new subcategory
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, image, description, taxApplicability, tax, category } =
    req.body;

  // Create a new subcategory document
  const subCategory = new SubCategory({
    name,
    image,
    description,
    taxApplicability,
    tax,
    category,
  });
  await subCategory.save();

  // Add the new subcategory to the parent category
  const parentCategory = await Category.findById(category);
  parentCategory.subcategories.push(subCategory._id);
  await parentCategory.save();

  res.status(201).json(subCategory);
});

// Controller to get all subcategories
export const getAllSubCategories = asyncHandler(async (req, res) => {
  // Fetch all subcategories and populate their parent categories
  const subCategories = await SubCategory.find().populate("category");
  res.status(200).json(subCategories);
});

// Controller to get a subcategory by ID or name
export const getSubCategoryByIdOrName = asyncHandler(async (req, res) => {
  const { id, name } = req.params;
  const query = id ? { _id: id } : { name };
  const subCategory = await SubCategory.findOne(query).populate(
    "category items"
  );

  if (!subCategory) {
    res.status(404).json({ message: "SubCategory not found" });
  } else {
    res.status(200).json(subCategory);
  }
});

// Controller to update a subcategory
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find the subcategory by ID and update it with the provided data
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedSubCategory) {
    res.status(404).json({ message: "SubCategory not found" });
  } else {
    res.status(200).json(updatedSubCategory);
  }
});
