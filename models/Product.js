const mongoose = require('mongoose');
const ProductSchema = require('../schemas/productSchema')

module.exports = mongoose.model("Product", ProductSchema);