const User = require('../models/User');
const Order = require('../models/Order');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');

    user.address.push(req.body.address);
    await user.save();
    res.json(user.address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, addAddress, getOrders };
