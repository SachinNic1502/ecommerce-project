const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, addAddress, getOrders } = require('../controllers/userController');

const router = express.Router();

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/address').post(protect, addAddress);
router.route('/orders').get(protect, getOrders);

module.exports = router;
