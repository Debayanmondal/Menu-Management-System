import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean },
  tax: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

const SubCategory = mongoose.model("SubCategory", subcategorySchema);
export default SubCategory;
