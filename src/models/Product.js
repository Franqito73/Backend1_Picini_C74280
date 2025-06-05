const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: String,
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: Number,
  category: String,
  thumbnails: [String], // array de strings
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
