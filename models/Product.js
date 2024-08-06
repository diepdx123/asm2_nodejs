const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
