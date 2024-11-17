const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error('Product not found');

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.image = result.secure_url;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error('Product not found');

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
