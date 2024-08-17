import Item from "../models/itemModel.js";
import SubCategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "../utils/errorHandler.js";

// Controller to create a new item
export const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    taxApplicability,
    tax,
    baseAmount,
    discount,
    subcategory,
    category,
  } = req.body;

  // Create a new item document
  const item = new Item({
    name,
    image,
    description,
    taxApplicability,
    tax,
    baseAmount,
    discount,
    subcategory,
    category,
  });
  await item.save();

  // If the item belongs to a subcategory, add it to the subcategory's items array
  if (subcategory) {
    const parentSubCategory = await SubCategory.findById(subcategory);
    parentSubCategory.items.push(item._id);
    await parentSubCategory.save();
  }
  // If the item belongs to a category directly, add it to the category's subcategories array
  else if (category) {
    const parentCategory = await Category.findById(category);
    parentCategory.subcategories.push(item._id);
    await parentCategory.save();
  }

  res.status(201).json(item);
});

// Controller to get all items
export const getAllItems = asyncHandler(async (req, res) => {
  // Fetch all items and populate their parent subcategories and categories
  const items = await Item.find().populate("subcategory category");
  res.status(200).json(items);
});

// Controller to get an item by ID or name
export const getItemByIdOrName = asyncHandler(async (req, res) => {
  const { id, name } = req.params;
  const query = id ? { _id: id } : { name };
  const item = await Item.findOne(query).populate("subcategory category");

  if (!item) {
    res.status(404).json({ message: "Item not found" });
  } else {
    res.status(200).json(item);
  }
});

// Controller to update an item
export const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find the item by ID and update it with the provided data
  const updatedItem = await Item.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedItem) {
    res.status(404).json({ message: "Item not found" });
  } else {
    res.status(200).json(updatedItem);
  }
});
