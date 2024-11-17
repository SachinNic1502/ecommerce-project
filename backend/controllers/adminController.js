const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const manageProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const manageOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { manageUsers, manageProducts, manageOrders };
