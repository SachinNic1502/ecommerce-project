const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const {
  manageUsers,
  manageProducts,
  manageOrders,
} = require('../controllers/adminController');

const router = express.Router();

router.route('/users').get(protect, admin, manageUsers);
router.route('/products').get(protect, admin, manageProducts);
router.route('/orders').get(protect, admin, manageOrders);

module.exports = router;
