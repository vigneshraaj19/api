
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,},
    desc: { type: String, required: true, },
    source: { type: String },
    destination: { type: String },
    despature: { type: String },
    arrival: { type: String },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    timeinterval: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);