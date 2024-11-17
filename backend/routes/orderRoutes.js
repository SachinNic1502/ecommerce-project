const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .post(protect, createOrder);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

module.exports = router;
