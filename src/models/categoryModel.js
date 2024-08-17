import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number },
  taxType: { type: String },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
